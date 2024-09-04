import { GitFork, LockOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import PromptBadge from "./prompt-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";
import { forkUI } from "@/actions/ui/fork-ui";
import { useSession } from "next-auth/react";
import UserButton from "./user-button";

const UIHeader = ({ mainPrompt, uiId, loading, forkedFrom }: { mainPrompt: string; uiId: string, loading: boolean, forkedFrom?: string }) => {
    const router = useRouter();
    const { toggle } = useAuthModal();
    const [isForking, setIsForking] = useState(false);
    const { data: session, status } = useSession()
    const userId = session?.user?.id

    const handleFork = async () => {
        if(!userId) {
            toggle();
            return;
        }
        if (loading) return;
        setIsForking(true);
        try {
            const forkedUI = await forkUI(uiId, userId!);
            toast.success('UI forked successfully');
            router.push(`/ui/${forkedUI.id}`);
        } catch (error) {
            console.error('Error forking UI:', error);
            toast.error("" + error);
        } finally {
            setIsForking(false);
        }
    };

    return (
        <div className="w-full bg-white flex justify-between items-center p-4">
            <div className="flex space-x-2 h-8 items-center">
                <Button onClick={() => router.push("/")} variant={"ghost"} className="text-xl font-bold p-0">WindAI</Button>
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
                {
                    forkedFrom && (
                        <Badge onClick={()=>router.push(`/ui/${forkedFrom}`)} variant={"outline"} className="rounded-xl space-x-1 cursor-pointer">
                            <GitFork size={14} />
                            <p>From : {forkedFrom}</p>
                        </Badge>
                    )
                }
            </div>
            <div className="flex space-x-2 h-8 items-center">
                {
                    status==="authenticated" && (   
                        <Button onClick={handleFork} variant="outline" className="rounded-3xl" disabled={isForking || loading}>
                            {isForking ? 'Forking...' : 'Fork UI'}
                        </Button>
                    )
                }
                <Button onClick={() => router.push("/")} variant="default" className="rounded-3xl">New Generation</Button>
                {
                    status==="unauthenticated" && (   
                        <Button onClick={() => toggle()} variant="default">Sign In</Button>
                    )
                }
                {
                    status==="authenticated" && session.user && (
                        <UserButton user={session.user} />
                    )
                }
            </div>
        </div>
    );
};

export default UIHeader;