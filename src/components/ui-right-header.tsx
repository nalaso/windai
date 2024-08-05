"use client"
import { CodeXml, Cpu, LaptopMinimal, LoaderCircle, LockOpen, PackageSearch, RefreshCw, Scale, Smartphone, Tablet } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useEffect, useState } from "react";

interface Uis {
    precise:{
        loading: boolean,
        code: string
    },
    balanced:{
        loading: boolean,
        code: string
    },
    creative:{
        loading: boolean,
        code: string
    }
}

const UIRigthHeader = ({
    setDesktop,
    setTablet,
    setPhone,
    setuis,
    uis,
    setMode,
    mode
}:{
    setDesktop: () => void,
    setTablet: () => void,
    setPhone: () => void,
    setuis: (uis: Uis) => void,
    uis: Uis,
    setMode: (mode: string) => void,
    mode: string,
}) => {
    const [type, setType] = useState("desktop")

    useEffect(() => {
        if (type === "desktop") {
            setDesktop();
        } else if (type === "tablet") {
            setTablet();
        } else if (type === "phone") {
            setPhone();
        }
    }, [type])

    return (
        <div className="w-full bg-white flex justify-between items-center p-2 rounded-t-xl">
            <div className="flex space-x-2 items-center">
                <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/nalaso.png" />
                    <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <Separator className="h-6" orientation="vertical" />
                <Badge variant={"secondary"} className="rounded-xl">prompt</Badge>
                <Button variant={"ghost"} className="rounded-full" size={"icon"}>
                    <RefreshCw className="text-gray-600" size={16} />
                </Button>
            </div>
            <div className="flex space-x-2 items-center ">
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
                            uis.precise.loading?(
                                <LoaderCircle className="h-4 w-4 ml-1 animate-spin"/>
                            ):(
                                <PackageSearch className="h-4 w-4 ml-1" />
                            )
                        }
                    </ToggleGroupItem>
                    <ToggleGroupItem value="balanced" aria-label="Toggle italic">
                        Balanced
                        {
                            uis.balanced.loading?(
                                <LoaderCircle className="h-4 w-4 ml-1 animate-spin"/>
                            ):(
                                <Scale className="h-4 w-4 ml-1" />
                            )
                        }
                    </ToggleGroupItem>
                    <ToggleGroupItem value="creative" aria-label="Toggle underline">
                        Creative
                        {
                            uis.creative.loading?(
                                <LoaderCircle className="h-4 w-4 ml-1 animate-spin"/>
                            ):(
                                <Cpu className="h-4 w-4 ml-1" />
                            )
                        }
                    </ToggleGroupItem>
                </ToggleGroup>
                <Button variant="default" className="rounded-lg">
                    Code
                    <CodeXml className="ml-2"/>
                </Button>
            </div>
        </div>
    );
};

export default UIRigthHeader;