"use client"
import { createSubPrompt } from "@/actions/ui/create-subprompt"
import { createUI } from "@/actions/ui/create-ui"
import Sidebar from "@/components/sidebar"
import { Button, Card, Input } from "@/components/ui"
import UIBody from "@/components/ui-body"
import UIHeader from "@/components/ui-header"
import UIRigthHeader from "@/components/ui-right-header"
import { useUIState } from "@/hooks/useUIState"
import { db } from "@/lib/db"
import { useUser } from "@clerk/nextjs"
import { set } from "date-fns"
import { LoaderCircle, SendHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ImperativePanelGroupHandle } from "react-resizable-panels"

const UI = () => {
	const ref = useRef<ImperativePanelGroupHandle>(null);
	const {user} = useUser()
	console.log(user);
	const username = user?.username!
	
	const [prompt, setPrompt] = useState("")
	const [code, setCode] = useState("")
	const [currentState, setCurrentState] = useState(-1)
	const [mode, setMode] = useState("precise")
	const [loading, setLoading] = useState(false)
	const [uiid, setuiid] = useState("0")
	const [uis, setuis] = useState<{
		[key: string]: {
			loading: boolean;
			code: string;
		};
	}>({
		precise: {
			loading: false,
			code: ""
		},
		balanced: {
			loading: false,
			code: ""
		},
		creative: {
			loading: false,
			code: ""
		}
	});

	const charMap: {
		[key: string]: string;
	} = {
		"precise": "a",
		"balanced": "b",
		"creative": "c"
	}

	const { input, setInput } = useUIState();

	useEffect(() => {
	  if(input!=""){
		setPrompt(input)
	  }
	}, [])

	useEffect(() => {
		if(input!="" && prompt!=""){
		  setInput("")
		  generateCode()
		}
	}, [input, prompt])
	
	useEffect(() => {
		if (!uis.precise.loading && mode == "precise") {
			setCode(uis.precise.code)
		}
		else if (!uis.balanced.loading && mode == "balanced") {
			setCode(uis.balanced.code)
		}
		else if (!uis.creative.loading && mode == "creative") {
			setCode(uis.creative.code)
		}
	}, [uis.balanced.loading, uis.creative.loading, uis.precise.loading])

	useEffect(() => {
		if (mode === "precise") {
			setCode(uis.precise.code)
		} else if (mode === "balanced") {
			setCode(uis.balanced.code)
		}
		else if (mode === "creative") {
			setCode(uis.creative.code)
		}
	}, [mode])

	const setDesktop = () => {
		const panel = ref.current;
		if (panel) {
			panel.setLayout([0, 100, 0]);
		}
	};

	const setTablet = () => {
		const panel = ref.current;
		if (panel) {
			panel.setLayout([27, 46, 27]);
		}
	}

	const setPhone = () => {
		const panel = ref.current;
		if (panel) {
			panel.setLayout([38, 24, 38]);
		}
	}

	const generatePreciseCode = async (uiid:string) => {
		try {
			setuis(preuis => ({
				...preuis,
				precise: {
					...preuis.precise,
					loading: true
				}
			}))

			const res = await fetch('/api/anthropic', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ codeDescription: prompt }),
			});

			const response = await res.json();

			setuis(preuis => ({
				...preuis,
				precise: {
					code: response,
					loading: false
				}
			}))

			const subPrompt = "precise-"+prompt
			const data = await createSubPrompt(subPrompt, uiid, "a", response)
			
		} catch (e) {
			console.error(e);
		}
	}

	const generateCreativeCode = async (uiid: string) => {
		try {
			setuis(preuis => ({
				...preuis,
				creative: {
					...preuis.creative,
					loading: true
				}
			}))

			const description = await fetch('/api/page_description', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					codeCommand: prompt,
					type: "creative"
				}),
			});

			const codeDescription = await description.json();

			const res = await fetch('/api/anthropic', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ codeDescription }),
			});

			const response = await res.json();

			const subPrompt = "creative-"+prompt
			const data = await createSubPrompt(subPrompt, uiid, "c", response)

			setuis(preuis => ({
				...preuis,
				creative: {
					code: response,
					loading: false
				}
			}))

		} catch (e) {
			console.error(e);
		}
	}

	const generateBalancedCode = async (uiid:string) => {
		try {
			setuis(preuis => ({
				...preuis,
				balanced: {
					...preuis.balanced,
					loading: true
				}
			}))

			const description = await fetch('/api/page_description', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					codeCommand: prompt,
					type: "balanced"
				}),
			});

			const codeDescription = await description.json();

			const res = await fetch('/api/anthropic', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ codeDescription }),
			});

			const response = await res.json();

			const subPrompt = "balanced-"+prompt
			const data = await createSubPrompt(subPrompt, uiid, "b", response)

			setuis(preuis => ({
				...preuis,
				balanced: {
					code: response,
					loading: false
				}
			}))

		} catch (e) {
			console.error(e);
		}
	}

	const generateModifiedCode = async (uiid:string) => {
		try {
			setuis(preuis => ({
				...preuis,
				precise: {
					...preuis.precise,
					loading: true
				}
			}))

			const res = await fetch('/api/modifier', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					modifyDescription: prompt,
					precode: uis[mode]?.code
				}),
			});

			const response = await res.json();

			setuis(preuis => ({
				...preuis,
				precise: {
					code: response,
					loading: false
				}
			}))

			const subPrompt = prompt
			const data = await createSubPrompt(subPrompt, uiid, charMap[mode]+currentState, response)

			console.log(data);
			
		} catch (e) {
			console.error(e);
		}
	}

	const generateCode = async () => {
		if(prompt=="") return;

		setLoading(true)
		setCurrentState(pre=>pre+1)
		if(currentState==-1){
			console.log("creating ui");
			const ui = await createUI(prompt, username, "")
			setuiid(ui.id)
			const promised = [generatePreciseCode(ui.id), generateBalancedCode(ui.id), generateCreativeCode(ui.id)];
			await Promise.all(promised);
		}else{
			console.log("modifying ui");
			const promised = [generateModifiedCode(uiid)];
			await Promise.all(promised);
		}
		setLoading(false);
	}

	return (
		<div className="overflow-hidden h-screen">
			<UIHeader />
			<div className="flex h-screen border-collapse overflow-hidden">
				<Sidebar />
				<div className="flex-1 px-4 py-2 space-y-2">
					<Card className="flex flex-col bg-secondary">
						<div className="flex justify-between items-center">
							<UIRigthHeader
								setDesktop={setDesktop}
								setTablet={setTablet}
								setPhone={setPhone}
								setuis={setuis}
								uis={uis}
								setMode={setMode}
								mode={mode}
								currentState={currentState}
							/>
						</div>
						<UIBody code={code} ref={ref} />
					</Card>
					<Card className="flex w-full max-w-lg space-x-2 bg-black items-center m-auto">
						<Input
							disabled={loading}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							type="text"
							placeholder="Type a message..."
							className="flex-grow rounded-full bg-black px-6 py-4 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 border-0 focus-visible:border-0 "
						/>
						<Button disabled={loading} onClick={() => generateCode()} variant="ghost" size="icon" className="rounded-md w-12 h-12 text-gray-200 bg-black hover:bg-black hover:text-gray-600">
							{
								loading?(
									<LoaderCircle className="h-4 w-4 ml-1 animate-spin"/>
								):(
									<SendHorizontal />
								)
							}
						</Button>
					</Card>
				</div>

			</div>
		</div>
	)
}

export default UI