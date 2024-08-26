"use client"
import { createSubPrompt } from "@/actions/ui/create-subprompt"
import Sidebar from "@/components/sidebar"
import { Button, Card, Input } from "@/components/ui"
import UIBody from "@/components/ui-body"
import UIHeader from "@/components/ui-header"
import UIRigthHeader from "@/components/ui-right-header"
import { useUIState } from "@/hooks/useUIState"
import { useAuth, useUser } from "@clerk/nextjs"
import * as htmlToImage from 'html-to-image';
import { LoaderCircle, SendHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { ImperativePanelGroupHandle } from "react-resizable-panels"
import { updateUI } from "@/actions/ui/update-ui"
import { getUI } from "@/actions/ui/get-uis"
import { useRouter } from "next/navigation"
import { getCodeFromPromptId } from "@/actions/ui/get-code"

const UI = ({ params }: { params: any }) => {
	const ref = useRef<ImperativePanelGroupHandle>(null);
	const captureRef = useRef<HTMLDivElement>(null);
	const { userId } = useAuth()
	const router = useRouter()

	const [selectedVersion, setSelectedVersion] = useState({
		prompt: "",
		version: -1
	})
	const [prompt, setPrompt] = useState("")
	const [code, setCode] = useState("")
	const [currentState, setCurrentState] = useState(-1)
	const [mode, setMode] = useState("precise")
	const [loading, setLoading] = useState(false)
	const [backendCheck, setBackendCheck] = useState(0)
	const uiid = params.uiid
	const [ui, setUi] = useState<{
		user?: { username: string; imageUrl: string } | undefined;
		subPrompts: {
			id: string;
			UIId: string;
			SUBId: string;
			createdAt: Date;
			subPrompt: string;
			code: string;
		}[][];
		id: string;
		userId: string;
		prompt: string;
		img: string;
		createdAt: Date;
		likes: number;
		views: number;
	} | null>(null)
	
	const [uiState, setUiState] = useState<{
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
		},
	});

	console.log(selectedVersion.version,currentState);
	
	
	const charMap: {
		[key: string]: string;
	} = {
		"precise": "a",
		"balanced": "b",
		"creative": "c"
	}

	const { input, setInput } = useUIState();

	const getCode = async (id: string, iidx: number, jidx: number) => {
		const code = await getCodeFromPromptId(id)
		setUi((prevUi) => {
			if (prevUi) {
				const updatedSubPrompts = [...prevUi.subPrompts];
				updatedSubPrompts[iidx][jidx].code = code!
				return {
					...prevUi,
					subPrompts: updatedSubPrompts
				};
			} else {
				return prevUi;
			}
		})
		return code!
	}

	const setVersion = async (version: number) => {	
		console.log(ui?.subPrompts);
		
		if (ui?.subPrompts.length === 0) return
		const subPrompt = ui?.subPrompts[version]
		if(!subPrompt) return	

		setSelectedVersion({
			prompt: subPrompt[0].subPrompt,
			version: version
		})

		var preiseCode = subPrompt[0].code
		if(preiseCode==""){
			setUiState(preUIState => ({
				...preUIState,
				precise: {
					...preUIState.precise,
					loading: true
				}
			}))
			preiseCode = await getCode(subPrompt[0].id, version, 0)
		}
		if(version===0){
			var balancedCode = subPrompt[1].code
			var creativeCode = subPrompt[2].code
			if(balancedCode==""){
				setUiState(preUIState => ({
					...preUIState,
					balanced: {
						...preUIState.balanced,
						loading: true
					}
				}))
				balancedCode = await getCode(subPrompt[1].id, version, 1)
			}
			if(creativeCode==""){
				setUiState(preUIState => ({
					...preUIState,
					creative: {
						...preUIState.creative,
						loading: true
					}
				}))
				creativeCode = await getCode(subPrompt[2].id, version, 2)
			}
			setUiState({
				precise: {
					loading: false,
					code: preiseCode!
				},
				balanced: {
					loading: false,
					code: balancedCode!
				},
				creative: {
					loading: false,
					code: creativeCode!
				}
			})
		}else{
			setUiState({
				precise: {
					loading: false,
					code: preiseCode!
				},
				balanced: {
					loading: false,
					code: ""
				},
				creative: {
					loading: false,
					code: ""
				}
			})
		}
		setMode("precise")
		setCode(preiseCode!)
	}

	useEffect(() => {
		const fetchUI = async () => {
			const fetchedUI = await getUI(uiid);

			if (!fetchedUI) {
				console.error("Fetched UI is null or undefined.");
				router.push("/");
				return;
			}

			const subPrompts = fetchedUI.subPrompt || [];

			setCurrentState(subPrompts.length===0?0:subPrompts.length-3);

			if(!subPrompts.find(sp => sp.SUBId === 'a')){
				const filterfetchedUI = {
					...fetchedUI,
					subPrompt: undefined,
					subPrompts: []
				};
				setUi(filterfetchedUI);
				setBackendCheck(1);
				return
			}

			const subPromptMap = {
				'a': subPrompts.find(sp => sp.SUBId === 'a') || [],
				'b': subPrompts.find(sp => sp.SUBId === 'b') || [],
				'c': subPrompts.find(sp => sp.SUBId === 'c') || [],
			};

			const groupedSubPrompts = [
				[{
					...subPromptMap['a'],
					code: ""
				}, {
					...subPromptMap['b'],
					code: ""
				}, {
					...subPromptMap['c'],
					code: ""
				}] as { id: string; UIId: string; SUBId: string; createdAt: Date; subPrompt: string; code : string; }[]
			];

			const remainingSubPrompts = subPrompts.filter(subPromptObj =>
				!['a', 'b', 'c'].includes(subPromptObj.SUBId)
			);

			const sortedRemainingSubPrompts = remainingSubPrompts.sort((a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);

			const combinedSubPrompts = [
				...groupedSubPrompts,
				...sortedRemainingSubPrompts.map(subPrompt => [{
					...subPrompt,
					code: ""
				}] as { id: string; UIId: string; SUBId: string; createdAt: Date; subPrompt: string; code: string; }[])
			];

			const filterfetchedUI = {
				...fetchedUI,
				subPrompt: undefined,
				subPrompts: combinedSubPrompts
			};
			setUi(filterfetchedUI);
			setBackendCheck(1);
		};

		fetchUI();
	}, []);
	
	useEffect(() => {
		if (backendCheck === 0) return		
		setVersion(currentState)
		if (input != "") {
			setPrompt(input)
		}
	}, [backendCheck])

	useEffect(() => {
		if (input != "" && prompt != "") {
			setInput("")
			generateCode()
		}
	}, [input, prompt])

	useEffect(() => {
		if (!uiState[mode].loading) {
			setCode(uiState[mode].code)
		}
	}, [uiState.balanced.loading, uiState.creative.loading, uiState.precise.loading])

	useEffect(() => {
		if (["precise", "balanced", "creative"].includes(mode)) {
			setCode(uiState[mode].code)
		}
	}, [mode])

	const setPanelView = (view: string) => {
		const panel = ref.current;
		if (!panel) return;
		if (view === "desktop") panel.setLayout([0, 100, 0]);
		else if (view === "tablet") panel.setLayout([27, 46, 27]);
		else if (view === "phone") panel.setLayout([38, 24, 38]);
	}

	const generatePreciseCode = async () => {
		try {
			setUiState(preuis => ({
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

			setUiState(preuis => ({
				...preuis,
				precise: {
					code: response,
					loading: false
				}
			}))

			const subPromptText = "precise-" + prompt
			const data = await createSubPrompt(subPromptText, uiid, "a", response)

			return {
				code: data.codeData.code,
				id: data.data.id
			}

		} catch (e) {
			console.error(e);
		}
	}

	const generateCreativeCode = async () => {
		try {
			setUiState(preuis => ({
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

			const subPrompt = "creative-" + prompt
			const data = await createSubPrompt(subPrompt, uiid, "c", response)

			setUiState(preuis => ({
				...preuis,
				creative: {
					code: response,
					loading: false
				}
			}))

			return {
				code: data.codeData.code,
				id: data.data.id
			}

		} catch (e) {
			console.error(e);
		}
	}

	const generateBalancedCode = async () => {
		try {
			setUiState(preuis => ({
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

			const subPrompt = "balanced-" + prompt
			const data = await createSubPrompt(subPrompt, uiid, "b", response)

			setUiState(preuis => ({
				...preuis,
				balanced: {
					code: response,
					loading: false
				}
			}))

			return {
				code: data.codeData.code,
				id: data.data.id
			}

		} catch (e) {
			console.error(e);
		}
	}

	const generateModifiedCode = async () => {
		try {
			setUiState(preuis => ({
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
					precode: uiState[mode]?.code
				}),
			});

			const response = await res.json();

			setUiState(preuis => ({
				...preuis,
				precise: {
					code: response,
					loading: false
				}
			}))

			const subPrompt = prompt
			const data = await createSubPrompt(subPrompt, uiid, charMap[mode] + currentState, response)

			return {
				code: data.codeData.code,
				id: data.data.id
			}
		} catch (e) {
			console.error(e);
		}
	}

	console.log(uiState);
	

	const generateCode = async () => {
		if (prompt === "") return;
		setLoading(true);
		setCurrentState(ui?.subPrompts.length ?? 1); 
		setSelectedVersion({
			prompt: prompt,
			version: selectedVersion.version+1
		})

		let promises: Promise<{ code: string; id: string; } | undefined>[];

		if (ui?.subPrompts.length === 0) {
			promises = [generatePreciseCode(), generateBalancedCode(), generateCreativeCode()];
		} else {
			promises = [generateModifiedCode()];
		}

		const resolved = await Promise.all(promises);

		console.log(resolved);

		setUi((prevUi) => {
			if (prevUi) {
				const updatedSubPrompts = [...prevUi.subPrompts];

				if (ui?.subPrompts.length === 0) {
					updatedSubPrompts.push([
						{ id: resolved[0]?.id!, UIId: uiid, SUBId: 'a', createdAt: new Date(), subPrompt: "precise"+prompt, code: resolved[0]?.code! },
						{ id: resolved[1]?.id!, UIId: uiid, SUBId: 'b', createdAt: new Date(), subPrompt: "balanced"+prompt, code: resolved[1]?.code! },
						{ id: resolved[2]?.id!, UIId: uiid, SUBId: 'c', createdAt: new Date(), subPrompt: "creative"+prompt, code: resolved[2]?.code! }
					]);
					setMode("precise");
				} else {
					updatedSubPrompts.push([{ id: resolved[0]?.id!, UIId: uiid, SUBId: charMap[mode] + currentState, createdAt: new Date(), subPrompt: prompt, code: resolved[0]?.code! }]);
				}

				return {
					...prevUi,
					subPrompts: updatedSubPrompts
				};
			} else {
				return prevUi;
			}
		});
		setPrompt("");
		setLoading(false);
		// capture();
	}

	const capture = async () => {
		htmlToImage.toJpeg(captureRef.current!).then(function (dataUrl: string) {
			var img = new Image();
			img.src = dataUrl;
			img.onload = async function () {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				const width = 1200;
				const scaleFactor = width / img.width;
				const height = img.height * scaleFactor;

				canvas.width = width;
				canvas.height = height;

				ctx!.drawImage(img, 0, 0, width, height);

				const resizedDataURL = canvas.toDataURL('image/jpeg');
				await updateUI(uiid, {
					img: resizedDataURL
				})
			}
		})
	}	

	return (
		<div className="overflow-hidden h-screen">
			<UIHeader mainPrompt={ui?.prompt!}/>
			<div className="flex h-screen border-collapse overflow-hidden">
				<Sidebar selectedVersion={selectedVersion.version} setVersion={setVersion} subPrompts={ui?.subPrompts}/>
				<div className="flex-1 px-4 py-2 space-y-2">
					<Card className="flex flex-col bg-secondary">
						<div className="flex justify-between items-center">
							<UIRigthHeader
								UIId={uiid}
								selectedVersion={selectedVersion.version}
								subPrompt={selectedVersion.prompt}
								setPanelView={setPanelView}
								setUiState={setUiState}
								uiState={uiState}
								setMode={setMode}
								mode={mode}
								code={code}
							/>
						</div>
						<UIBody isloading={uiState[mode!].loading} code={code} ref={ref} captureRef={captureRef} />
					</Card>
					{
						ui?.userId === userId && selectedVersion.version == currentState && (
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
										loading ? (
											<LoaderCircle className="h-4 w-4 ml-1 animate-spin" />
										) : (
											<SendHorizontal />
										)
									}
								</Button>
							</Card>
						)
					}
				</div>
			</div>
		</div>
	)
}

export default UI