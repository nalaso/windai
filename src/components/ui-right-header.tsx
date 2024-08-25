"use client"
import { CodeXml, Cpu, LaptopMinimal, LoaderCircle, LockOpen, PackageSearch, RefreshCw, Scale, Smartphone, Tablet } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useEffect, useState } from "react";
import LikeButton from "./like-button";
import { toggleLike } from "@/actions/ui/toggle-like-ui";
import { useAuth, useUser } from "@clerk/nextjs";

interface UIState {
    [key: string]: {
        loading: boolean;
        code: string;
    };
}

const UIRigthHeader = ({
    UIId,
    subPrompt,
    selectedVersion,
    setPanelView,
    setUiState,
    uiState,
    setMode,
    mode,
    currentState
}: {
    UIId: string,
    subPrompt: string,
    selectedVersion: number,
    setPanelView: (type: string) => void,
    setUiState: (uiState: UIState) => void,
    uiState: {
		[key: string]: {
			loading: boolean;
			code: string;
		};
	},
    setMode: (mode: string) => void,
    mode: string,
    currentState: number
}) => {
    const [type, setType] = useState("desktop")
    const {userId} = useAuth()   
    const [liked, setLiked] = useState(false)     

    useEffect(() => {
        setPanelView(type)
    }, [type])

    const toggleLikeClick = async() => {
        const liked = await toggleLike(userId!,UIId)
        setLiked(liked.liked)
    }

    return (
        <div className="w-full bg-white flex justify-between items-center p-2 rounded-t-xl">
            <div className="flex space-x-2 items-center">
                <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/nalaso.png" />
                    <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <Separator className="h-6" orientation="vertical" />
                <Badge variant={"secondary"} className="rounded-xl">{subPrompt}</Badge>
                <Button variant={"ghost"} className="rounded-full" size={"icon"}>
                    <RefreshCw className="text-gray-600" size={16} />
                </Button>
            </div>
            <div className="flex space-x-2 items-center ">
                <LikeButton liked={liked} toggleLikeClick={toggleLikeClick} />
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
                        selectedVersion==0 && (
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
                        selectedVersion==0 && (
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
                <Button variant="default" className="rounded-lg">
                    Code
                    <CodeXml className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default UIRigthHeader;