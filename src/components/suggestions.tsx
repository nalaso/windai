import { MoveUpRight } from "lucide-react"
import { Badge } from "./ui"
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUIState } from "@/hooks/useUIState";
import { createUI } from "@/actions/ui/create-ui";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useModel } from "@/hooks/useModel";

const Suggestions = () => {
	const router = useRouter();
	const { setLoading, setInput, uiType } = useUIState();
	const { toggle } = useAuthModal()
	const { data: session, status } = useSession()
	const userId = session?.user?.id
	const [suggestions, setSuggestions] = useState([
		"login page for netflix",
		"product detail card for sneakers",
		"ecommerce checkout page",
		"dashboard for sales data",
		"Instagram App UI clone"
	])

	useEffect(() => {
		const fetchSuggestions = async () => {
			try {
				const res = await fetch(`/api/suggestions?modelId=${encodeURIComponent('google:gemini-1.5-flash-exp-0827')}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!res.ok) {
					throw new Error('Failed to fetch suggestions');
				}
				const data = await res.json();

				if (Array.isArray(data) && data.length > 0) {
					setSuggestions(data);
				}
			} catch (error) {
				console.error('Error fetching suggestions:', error);
			}
		}
		fetchSuggestions()
	}, [])

	const handleClick = async (suggestion: string) => {
		setInput(suggestion)
		try {
			if (status === "authenticated") {
				if (!userId) {
					toggle()
					return;
				}
				setLoading(true)
				const ui = await createUI(suggestion, userId, uiType);
				setLoading(false)
				router.push(`/ui/${ui.id}`);
			} else {
				toggle()
			}
		} catch (error) {
			toast.error('Failed to create UI');
		}
	}

	return (
		<div className="inline-flex flex-wrap gap-2 w-[80vw] justify-center">
			{suggestions.map((suggestion, index) => (
				<Badge
					onClick={() => handleClick(suggestion)}
					variant="secondary"
					key={index}
					className="p-1 rounded-md cursor-pointer flex items-center justify-between whitespace-nowrap shrink-0"
				>
					<span className="mr-1">{suggestion}</span>
					<MoveUpRight size={14} />
				</Badge>
			))}
		</div>
	)
}

export default Suggestions