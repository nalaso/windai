import { LockOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UIHeader = () => {
    return (
        <div className="w-full bg-white flex justify-between items-center p-4">
            <div className="flex space-x-2 h-8 items-center">
                <p className="text-xl font-bold">V1</p>
                <Separator orientation="vertical" />
                <Badge variant={"secondary"} className="rounded-xl">prompt</Badge>
                <Badge variant={"outline"} className="rounded-xl space-x-1">
                    <LockOpen size={14} />
                    <p>Public</p>
                </Badge>
            </div>
            <div className="flex space-x-2 h-8 items-center">
                <Button variant="default" className="rounded-3xl">New Generation</Button>
                <Avatar>
                    <AvatarImage src="https://github.com/nalaso.png" />
                    <AvatarFallback>NS</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default UIHeader;