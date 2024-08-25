"use client"
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui";

export default function Sidebar({ subPrompts, setVersion, selectedVersion }: any) {
	const { isOpen, toggle } = useSidebar();
	const [status, setStatus] = useState(false);

	const handleToggle = () => {
		setStatus(true);
		toggle();
		setTimeout(() => setStatus(false), 500);
	};

	if (!subPrompts) return <></>

	return (
		<nav
			className={cn(
				`relative hidden h-screen border-r pt-10 md:block`,
				status && "duration-200",
				isOpen ? "w-44" : "w-[50px]"
			)}
		>
			<ArrowLeft
				size={22}
				className={cn(
					"absolute -right-3 top-0 cursor-pointer rounded-full border bg-background text-3xl text-foreground transition-transform duration-500",
					!isOpen && "rotate-180"
				)}
				onClick={handleToggle}
			/>
			<div className="px-3 py-2 flex justify-center h-[80vh] overflow-y-auto">
				<div className="flex flex-col space-y-4">
					{
						subPrompts.map((subPrompt: any, i: number) => (
							<Button size={"icon"} key={subPrompt[0].id} onClick={() => setVersion(i)} variant={selectedVersion==i?"outline":"secondary"} className="text-xl font-bold text-gray-500">V{i + 1}</Button>
						))
					}
				</div>
			</div>
		</nav>
	);
}
