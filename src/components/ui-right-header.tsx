"use client"
import { CodeXml, Cpu, LaptopMinimal, LoaderCircle, MoreHorizontal, PackageSearch, RefreshCw, Scale, Share2, Smartphone, Tablet } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useEffect, useState } from "react";
import LikeButton from "./like-button";
import { toggleLike } from "@/actions/ui/toggle-like-ui";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { embededCode } from "@/lib/code";
import PromptBadge from "./prompt-badge";
import { useAuthModal } from "@/hooks/useAuthModal";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSession } from "next-auth/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import useTheme from "@/hooks/useTheme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getCss } from "@/lib/globalCss";
import { themes as defaultThemes, themes } from "@/lib/themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const UIRigthHeader = ({
    UIId,
    views,
    subPrompt,
    subid,
    userimg,
    setPanelView,
    uiState,
    setMode,
    mode,
    uiType,
    code,
    modelId,
    createdAt,
    modesFound,
    regenerateCode,
    isLastSubprompt
}: {
    UIId: string,
    views: number,
    subPrompt: string,
    subid: string,
    userimg: string,
    setPanelView: (type: string) => void,
    uiState: {
        [key: string]: {
            loading: boolean;
            code: string;
        };
    },
    setMode: (mode: string) => void,
    mode: string,
    code: string,
    uiType: string,
    modelId?: string,
    createdAt?: string,
    modesFound: {
        [key: string]: boolean;
    },
    regenerateCode: () => void,
    isLastSubprompt: boolean
}) => {
    const [type, setType] = useState("desktop")
    const { data: session, status } = useSession()
    const userId = session?.user?.id

    const { toggle } = useAuthModal()
    const [liked, setLiked] = useState(false)
    const { theme, setTheme } = useTheme()
    const [activeTab, setActiveTab] = useState("code")
    const [cssCode, setCssCode] = useState("")
    const [customThemes, setCustomThemes] = useState<any[]>([])

    useEffect(() => {
        setPanelView(type)
    }, [type])

    useEffect(() => {
        const globalCss = getCss(themes.find(t => t.id === theme)!)
        setCssCode(globalCss)
    }, [theme])

    useEffect(() => {
        const storedThemes = localStorage.getItem('customThemes')
        if (storedThemes) {
            setCustomThemes(JSON.parse(storedThemes))
        }
    }, [])

    const toggleLikeClick = async () => {
        if (!userId) {
            toggle()
            return
        }
        const liked = await toggleLike(userId!, UIId)
        setLiked(liked.liked)
    }

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            toast.success("Link copied to clipboard!");
        }).catch((err) => {
            console.error('Failed to copy: ', err);
            toast.error("Failed to copy link. Please try again.");
        });
    }

    const handleRegenerateCode = () => {
        if (isLastSubprompt) {
            regenerateCode();
        } else {
            toast.info("Regeneration is only available for the last generated subprompt.");
        }
    }

    const handleCopyCode = () => {
        const contentToCopy = activeTab === "code" ? embededCode(code, uiType) : cssCode;
        navigator.clipboard.writeText(contentToCopy || "").then(() => {
            toast.success(`${activeTab === "code" ? "React" : "CSS"} code copied to clipboard!`);
        }).catch((err) => {
            console.error('Failed to copy code: ', err);
            toast.error("Failed to copy code. Please try again.");
        });
    }

    return (
        <div className="w-full bg-white flex justify-between items-center p-2 rounded-t-xl">
            <div className="flex space-x-2 items-center">
                <Avatar className="w-6 h-6">
                    <AvatarImage src={userimg} />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Separator className="h-6" orientation="vertical" />
                <Badge variant={"secondary"} className="rounded-xl p-0 m-0">
                    <Tooltip>
                        <TooltipTrigger className='rounded-full font-semibold ml-2 flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>
                            <PromptBadge
                                variant={"secondary"}
                                className="rounded-full font-semibold flex text-ellipsis overflow-hidden whitespace-nowrap max-w-96"
                                prompt={subPrompt}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{subPrompt}</p>
                        </TooltipContent>
                    </Tooltip>
                    <Button
                        variant={"ghost"}
                        className="rounded-xl bg-gray-50 w-7 h-7"
                        size={"icon"}
                        onClick={handleRegenerateCode}
                        disabled={!isLastSubprompt}
                        title={isLastSubprompt ? "Regenerate code" : "Regeneration is only available for the last generated subprompt"}
                    >
                        <RefreshCw className={`m-0${isLastSubprompt ? "black" : "white"}`} size={16} />
                    </Button>
                </Badge>

                <Badge variant={"secondary"} className="rounded-sm text-xs text-gray-500 whitespace-nowrap">{views} views</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="flex gap-3">
                            <p className="text-gray-400">ModelId : </p>
                            <Badge variant={"secondary"}>{modelId || ""}</Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-3">
                            <p className="text-gray-400">Created At : </p>
                            <Badge variant={"secondary"}>{createdAt||""}</Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-3">
                            <p className="text-gray-400">UI Type :</p>
                            <Badge variant={"secondary"}>{uiType}</Badge>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex space-x-2 items-center ">
                <LikeButton liked={liked} toggleLikeClick={toggleLikeClick} />
                <Button variant="ghost" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                </Button>
                <ToggleGroup
                    value={type}
                    onValueChange={(value) => {
                        if (value) setType(value);
                    }}
                    className="bg-gray-200 p-0.5 rounded-lg" type="single">
                    <ToggleGroupItem value="desktop" aria-label="Toggle bold">
                        <LaptopMinimal className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="tablet" aria-label="Toggle italic">
                        <Tablet className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="phone" aria-label="Toggle underline">
                        <Smartphone className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup
                    value={mode}
                    onValueChange={(value) => {
                        if (value) setMode(value);
                    }}
                    className="bg-gray-200 p-0.5 rounded-lg" type="single">
                    <ToggleGroupItem value="precise" aria-label="Toggle bold">
                        Precise
                        {
                            uiState.precise.loading ? (
                                <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
                            ) : (
                                <PackageSearch className="h-4 w-4 ml-1" />
                            )
                        }
                    </ToggleGroupItem>
                    {
                        subid.endsWith("0") && modesFound?.balanced && (
                            <ToggleGroupItem value="balanced" aria-label="Toggle italic">
                                Balanced
                                {
                                    uiState.balanced.loading ? (
                                        <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
                                    ) : (
                                        <Scale className="h-4 w-4 ml-1" />
                                    )
                                }
                            </ToggleGroupItem>
                        )
                    }
                    {
                        subid.endsWith("0") && modesFound?.creative && (
                            <ToggleGroupItem value="creative" aria-label="Toggle underline">
                                Creative
                                {
                                    uiState.creative.loading ? (
                                        <LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
                                    ) : (
                                        <Cpu className="h-4 w-4 ml-1" />
                                    )
                                }
                            </ToggleGroupItem>
                        )
                    }
                </ToggleGroup>
                <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-min">
                        <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {defaultThemes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                        {customThemes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" className="rounded-lg">
                            Code
                            <CodeXml className="ml-2" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[75vw] overflow-hidden">
                        <DialogHeader>
                            <DialogTitle>Code View</DialogTitle>
                            <DialogDescription>
                                <PromptBadge variant={"secondary"} className="rounded-xl"
                                    prompt={subPrompt}
                                />
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="code" className="w-full" onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="code">React Code</TabsTrigger>
                                <TabsTrigger value="css">globals.css</TabsTrigger>
                            </TabsList>
                            <TabsContent value="code">
                                <div className="py-4 max-h-[70vh] overflow-y-auto">
                                    <SyntaxHighlighter language="jsx" style={oneLight}>
                                        {embededCode(code, uiType) || ""}
                                    </SyntaxHighlighter>
                                </div>
                            </TabsContent>
                            <TabsContent value="css">
                                <div className="py-4 max-h-[70vh] overflow-y-auto">
                                    <SyntaxHighlighter language="css" style={oneLight} >
                                        {cssCode}
                                    </SyntaxHighlighter>
                                </div>
                            </TabsContent>
                        </Tabs>
                        <DialogFooter className="flex sm:justify-start justify-start">
                            <Button onClick={handleCopyCode}>Copy {activeTab === "code" ? "React" : "CSS"} Code</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default UIRigthHeader;