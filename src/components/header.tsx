import { Avatar, Button } from "./ui";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserButton from "./user-button";

const Header = () => {
	const { toggle } = useAuthModal()
	const { data: session, status } = useSession()
	const router = useRouter()

	return (
		<div className="w-full bg-white flex justify-between items-center p-4">
			<div className="flex">
				<Button onClick={() => router.push("/")} variant={"ghost"} className="text-xl font-bold">WindAI</Button>
				<Button onClick={() => router.push("/explore")} variant={"outline"} className="text-xl font-semibold">Explore</Button>
			</div>
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
	);
};

export default Header;