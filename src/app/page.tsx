"use client"
import { createUI } from "@/actions/ui/create-ui";
import Header from "@/components/header";
import HomeUICards from "@/components/home-uis";
import Suggestions from "@/components/suggestions";
import { TipsCarousel } from "@/components/tips-carousel";
import { Badge, Button, Card, Input } from "@/components/ui";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUIState } from "@/hooks/useUIState";
import { LoaderCircle, SendHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
    const router = useRouter();
    const { input, setInput,loading, setLoading } = useUIState();
    const { toggle } = useAuthModal()
    const { data: session, status } = useSession()
    const userId = session?.user?.id

    const generateUI = async() => {
        if (!input) return;
        try {
            if (status==="authenticated" && userId) {
                setLoading(true)
                const ui = await createUI(input, userId, "")
                setLoading(false)
                router.push(`/ui/${ui.id}`);
            } else {
                toggle()
            }
        } catch (error) {
            toast.error("Failed to generate UI")
        }  
    }

    return (
        <div>
            <Header />
            <div className="flex items-center justify-center h-[70vh]">
                <div className="w-full max-w-lg h-auto items-center flex flex-col space-y-6">
                    <p className="font-bold text-5xl">
                        Generate. Ship. Done.
                    </p>
                    <p>
                        Generate UI with shadcn/ui from text prompts.
                    </p>
                    <Card className="flex w-full space-x-2 bg-black items-center">
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
                                loading?(
                                    <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
                                ):(
                                    <SendHorizontal />
                                )
                            }
                        </Button>
                    </Card>
                    <Suggestions />
                    <div className="pt-20">
                        {/* <TipsCarousel /> */}
                        <Badge onClick={()=>router.push("/settings/llm")} variant="default" className="text-sm border-spacing-1 cursor-pointer">Try different models from settings for faster response</Badge>
                        <Badge onClick={()=>window.open("https://git.new/windai")} variant="secondary" className="absolute border-2 border-black border-spacing-4 top-40 left-5 -rotate-45 text-sm cursor-pointer">To be open-sourced soon.</Badge>
                        <Badge onClick={()=>window.open("https://dub.sh/windai-discord")} variant="secondary" className="absolute bg-[#6570fd] hover:bg-black text-white bottom-56 right-5 rotate-45 text-sm cursor-pointer">Welcoming everyone to the WindAI Discord.</Badge>
                    </div>
                </div>
            </div>
            <HomeUICards />
        </div>
    );
}