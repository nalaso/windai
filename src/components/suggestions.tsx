import { MoveUpRight } from "lucide-react"
import { Badge } from "./ui"
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUIState } from "@/hooks/useUIState";
import { createUI } from "@/actions/ui/create-ui";

const Suggestions = () => {
	const suggestions = [
		"login page for netflix",
		"product detail card for sneakers",
		"ecommerce checkout page",
		"dashboard for sales data",
		"Instagram App UI clone"
	]

	const router = useRouter();
	const { input, setInput } = useUIState();
	const { toggle } = useAuthModal()
	const { userId, isSignedIn } = useAuth();

	const handleClick = async (suggestion:string) => {
		setInput(suggestion)
		if (isSignedIn) {
			const ui = await createUI(suggestion, userId, "")
			router.push(`/ui/${ui.id}`);
		} else {
			toggle()
		}
	}

	return (
		<div className="flex gap-2">
			{suggestions.map((suggestion, index) => (
				<Badge onClick={()=>handleClick(suggestion)} variant={"secondary"} key={index} className="p-1 rounded-md cursor-pointer whitespace-nowrap">
					{suggestion}
					<MoveUpRight size={14} />
				</Badge>
			))}
		</div>
	)
}

export default Suggestions