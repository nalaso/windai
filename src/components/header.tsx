"use client"
import { Button } from "./ui";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useBugReportModal } from "@/hooks/useBugReportModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserButton from "./user-button";
import { BugReportModal } from "./bug-report-modal";

const Header = () => {
	const { toggle: toggleAuth } = useAuthModal()
	const { toggle: toggleBugReport } = useBugReportModal()
	const { data: session, status } = useSession()
	const router = useRouter()

	return (
		<>
			<div className="w-full bg-white flex justify-between items-center p-4">
				<div className="flex space-x-2">
					<Button onClick={() => router.push("/")} variant={"ghost"} className="text-xl font-bold">
						<img src={"icon.png"} alt="" width={20} />
						WindAI
					</Button>
					<Button onClick={() => router.push("/explore")} variant={"outline"} className="text-xl font-semibold">Explore</Button>
					<Button onClick={() => router.push("/changelog")} variant={"outline"} className="text-xl font-semibold">Changelogs</Button>
				</div>
				<div className="flex space-x-2 items-center">
					{status === "authenticated" && (
						<Button onClick={toggleBugReport} variant="secondary">Bug Report / Feature Request</Button>
					)}
					<Button onClick={() => window.open("https://git.new/windai")} variant="default">Github</Button>
					{status === "authenticated" && (
						<Button onClick={() => window.open("https://dub.sh/windai-discord")} className="bg-[#6570fd]">Discord</Button>
					)}
					{status === "unauthenticated" && (
						<Button onClick={toggleAuth} variant="default">Sign In</Button>
					)}
					{status === "authenticated" && session.user && (
						<UserButton user={session.user} />
					)}
				</div>
			</div>
			<BugReportModal />
		</>
	);
};

export default Header;