import { LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOutGithub } from "@/actions/auth/sign-out";

interface UserButtonProps {
	user: User;
}

export default function UserButton({ user }: UserButtonProps) {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOutGithub();
		router.push("/")
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" className="flex-none rounded-full">
					<Image
						src={user.imageUrl || ""}
						alt="User profile picture"
						width={50}
						height={50}
						className="aspect-square rounded-full bg-background object-cover"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>@{user.username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={handleSignOut}>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Sign out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}