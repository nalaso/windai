import { LockOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import PromptBadge from "./prompt-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";
import { forkUI } from "@/actions/ui/fork-ui";

const UIHeader = ({ mainPrompt, uiId }: { mainPrompt: string; uiId: string }) => {
    const router = useRouter();
    const { toggle } = useAuthModal();
    const [isForking, setIsForking] = useState(false);
    const { userId } = useAuth();

    const handleFork = async () => {
        setIsForking(true);
        try {
            const forkedUI = await forkUI(uiId, userId!);
            toast.success('UI forked successfully');
            router.push(`/ui/${forkedUI.id}`);
        } catch (error) {
            console.error('Error forking UI:', error);
            toast.error('Failed to fork UI');
        } finally {
            setIsForking(false);
        }
    };

    return (
        <div className="w-full bg-white flex justify-between items-center p-4">
            <div className="flex space-x-2 h-8 items-center">
                <Button onClick={() => router.push("/")} variant={"ghost"} className="text-xl font-bold p-0">V1</Button>
                <Separator orientation="vertical" />
                <Tooltip>
                    <TooltipTrigger className='rounded-full font-semibold ml-2 flex-1 text-ellipsis overflow-hidden whitespace-nowrap'>
                        <PromptBadge
                            variant={"secondary"}
                            className="rounded-full font-semibold flex text-ellipsis overflow-hidden whitespace-nowrap max-w-96"
                            prompt={mainPrompt}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{mainPrompt}</p>
                    </TooltipContent>
                </Tooltip>
                <Badge variant={"outline"} className="rounded-xl space-x-1">
                    <LockOpen size={14} />
                    <p>Public</p>
                </Badge>
            </div>
            <div className="flex space-x-2 h-8 items-center">
                <Button onClick={() => router.push("/")} variant="default" className="rounded-3xl">New Generation</Button>
                <SignedIn>
                    <Button onClick={handleFork} variant="outline" className="rounded-3xl" disabled={isForking}>
                        {isForking ? 'Forking...' : 'Fork UI'}
                    </Button>
                </SignedIn>
                <SignedOut>
                    <Button onClick={() => toggle()} variant="default">Sign In</Button>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
};

export default UIHeader;