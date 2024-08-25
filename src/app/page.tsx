"use client"
import { createUI } from "@/actions/ui/create-ui";
import AuthModal from "@/components/auth-modal";
import Header from "@/components/header";
import HomeUICards from "@/components/home-uis";
import Suggestions from "@/components/suggestions";
import { Button, Card, Input } from "@/components/ui";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUIState } from "@/hooks/useUIState";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const { input, setInput } = useUIState();
    const { toggle } = useAuthModal()
    const { userId, isSignedIn } = useAuth();

    const generateUI = async() => {
        if (!input) return;
        if (isSignedIn) {
            const ui = await createUI(input, userId, "")
            router.push(`/ui/${ui.id}`);
        } else {
            toggle()
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
                        Generate UI with shadcn/ui from text prompts and <strike>images 😢</strike>.
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
                            <SendHorizontal />
                        </Button>
                    </Card>
                    <Suggestions />
                </div>
            </div>
            <HomeUICards />
            <AuthModal />
        </div>
    );
}