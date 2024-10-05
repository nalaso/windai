"use client"
import { createUI } from "@/actions/ui/create-ui";
import Header from "@/components/header";
import HomeUICards from "@/components/home-uis";
import Suggestions from "@/components/suggestions";
import { TipsCarousel } from "@/components/tips-carousel";
import { Badge, Button, Card, DropdownMenu, DropdownMenuItem, Input, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUIState } from "@/hooks/useUIState";
import { Image, InfoIcon, LoaderCircle, Lock, SendHorizontal, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef, useEffect } from "react";
import { useModel } from "@/hooks/useModel";

export default function Home() {
    const router = useRouter();
    const { setInitialModel, setModifierModel, setDescriptiveModel, setImageModel } = useModel();
    const { input, setInput, loading, setLoading, imageBase64, setImageBase64, uiType, setUIType } = useUIState();
    const { toggle } = useAuthModal()
    const { data: session, status } = useSession()
    const userId = session?.user?.id
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        const file = files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImageBase64("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const generateUI = async () => {
        if (!input) {
            toast.error("Please enter a message")
            return;
        };
        try {
            if (status === "authenticated" && userId) {
                setLoading(true)
                const ui = await createUI(input, userId, uiType)
                router.push(`/ui/${ui.id}`);
                setLoading(false)
            } else {
                toggle()
            }
        } catch (error) {
            toast.error("Failed to generate UI")
            setLoading(false)
        }
    }

    useEffect(() => {
        const cv = 3;
        const lv = parseInt(localStorage.getItem("cv") || "0");
        if (lv < cv) {
            toast.info("Changing default models to recommended models for better performance.");
            setInitialModel("glhf:hf:meta-llama/Meta-Llama-3.1-405B-Instruct");
            setModifierModel("glhf:hf:meta-llama/Meta-Llama-3.1-70B-Instruct");
            setDescriptiveModel("glhf:hf:google/gemma-2-27b-it");
            setImageModel("mistral:pixtral-12b-2409");
            localStorage.setItem("cv", cv.toString());
        }
    }, [])

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center mt-16">
                <div className="w-full max-w-lg h-auto items-center flex flex-col space-y-6">
                    <p className="font-bold text-5xl">
                        Generate. Ship. Done.
                    </p>
                    <p>
                        Generate UI with shadcn/nextui from text prompts or images.
                    </p>
                    <Card className="flex flex-col w-full space-x-2 bg-black items-center ">
                        <div className="flex w-full space-x-2 items-center">
                            <Input
                                type="text"
                                value={input}
                                placeholder="Type a message..."
                                onChange={e => setInput(e.target.value)}
                                className="flex-grow rounded-full bg-black px-6 py-4 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 border-0 focus-visible:border-0 focus:ring-gray-600"
                            />
                            <Button
                                onClick={() => generateUI()}
                                variant="ghost" size="icon" className="rounded-md w-12 h-12 text-gray-200 bg-black hover:bg-black hover:text-gray-600">
                                {
                                    loading ? (
                                        <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
                                    ) : (
                                        <SendHorizontal />
                                    )
                                }
                            </Button>
                        </div>
                        <div className="flex w-full space-x-2 items-center pb-2 ps-2">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <Image
                                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                className=" text-gray-200 bg-black hover:bg-gray-800"
                            />
                            {selectedImage && (
                                <div className="flex items-center justify-between bg-gray-800 rounded-md p-1">
                                    <img width={20} src={imageBase64} />
                                    <X
                                        onClick={removeImage}
                                        size={20}
                                        className="text-gray-200 hover:text-gray-400 cursor-pointer"
                                    />
                                </div>
                            )}
                            <Select onValueChange={setUIType} value={uiType}>
                                <SelectTrigger className="dark text-white w-min ring-0 focus:ring-0 h-8">
                                    <SelectValue placeholder="Select UI Type" />
                                </SelectTrigger>
                                <SelectContent className="dark w-min">
                                    <SelectItem value="shadcn-react">Shadcn/UI</SelectItem>
                                    <SelectItem value="nextui-react">Next UI</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="ionicons">
                                <SelectTrigger className="dark text-white w-min ring-0 focus:ring-0 h-8">
                                    <SelectValue placeholder="Icons" />
                                </SelectTrigger>
                                <SelectContent className="dark w-min">
                                    <SelectItem value="ionicons">Ion Icons</SelectItem>
                                    <SelectItem className="whitespace-nowrap" disabled value="lucidereact"><div className="flex items-center"><p className="mr-2">Lucide React</p> <Lock size={14} /></div></SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="public">
                                <SelectTrigger className="dark text-white w-min ring-0 focus:ring-0 h-8">
                                    <SelectValue placeholder="visibility" />
                                </SelectTrigger>
                                <SelectContent className="dark w-min">
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem disabled value="lucidereact"><div className="flex items-center"><p className="mr-2">private</p> <Lock size={14} /></div></SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant={"default"} onClick={() => router.push("/settings/llm")} className="w-min focus:ring-0 h-8">
                                LLM
                            </Button>
                        </div>
                    </Card>
                    {
                        selectedImage && (
                            <div className="bg-yellow-50 p-2 rounded-md flex items-start space-x-2 text-yellow-800">
                                <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">
                                    Image to code is in Beta. It doesn&apos;t support ShadcnUI/NextUI yet.
                                </p>
                            </div>
                        )
                    }
                    {
                        uiType === "nextui-react" && (
                            <div className="bg-yellow-50 p-2 rounded-md flex items-start space-x-2 text-yellow-800">
                                <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">
                                    NextUI is in Beta. May generate unparasarable code thus resulting in error while rendering.
                                </p>
                            </div>
                        )
                    }
                    <Suggestions />
                    <div className="pt-10"> 
                        {/* <TipsCarousel /> */}
                        <div className="bg-yellow-50 p-2 rounded-md flex items-start space-x-2 text-yellow-800">
                            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">
                                LLMs are subject to rate limits, which can cause some models to fail when attempting to generate UI components. These limitations may result in delayed responses or the inability to complete tasks, especially when multiple users make requests using same models within a short time frame.
                            </p>
                        </div>
                        <div className="flex justify-center mt-3">
                        <Badge onClick={() => router.push("/settings/llm")} variant="default" className="text-sm border-spacing-1 cursor-pointer">Try different models in the settings for a faster response.</Badge>
                        </div>
                        <Badge onClick={() => window.open("https://git.new/windai")} variant="secondary" className="bg-[#ffeb3b] absolute border-2 border-black border-spacing-4 top-40 left-5 -rotate-45 text-sm cursor-pointer">Star us here.</Badge>
                        <Badge onClick={() => window.open("https://dub.sh/windai-discord")} variant="secondary" className="absolute bg-[#6570fd] hover:bg-black text-white bottom-56 right-5 rotate-45 text-sm cursor-pointer">Join the official WindAI Discord server.</Badge>
                    </div>
                </div>
            </div>
            <HomeUICards />
        </div>
    );
}