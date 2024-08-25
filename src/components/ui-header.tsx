import { LockOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";

const UIHeader = () => {
    const router = useRouter()
    const {toggle} = useAuthModal()
    return (
        <div className="w-full bg-white flex justify-between items-center p-4">
            <div className="flex space-x-2 h-8 items-center">
                <Button onClick={() => router.push("/")} variant={"ghost"} className="text-xl font-bold p-0">V1</Button>
                <Separator orientation="vertical" />
                <Badge variant={"secondary"} className="rounded-xl">prompt</Badge>
                <Badge variant={"outline"} className="rounded-xl space-x-1">
                    <LockOpen size={14} />
                    <p>Public</p>
                </Badge>
            </div>
            <div className="flex space-x-2 h-8 items-center">
                <Button onClick={() => router.push("/")} variant="default" className="rounded-3xl">New Generation</Button>
                <SignedOut>
                    <Button onClick={()=>toggle()} variant="default">Sign In</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default UIHeader;