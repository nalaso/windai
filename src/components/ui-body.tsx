"use client"
import { forwardRef, LegacyRef } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { ImperativePanelGroupHandle } from "react-resizable-panels"
import PreviewScreen from "./preview-screen"

const UIBody = forwardRef((props: { isloading: boolean, code: string, captureRef: LegacyRef<HTMLDivElement> }, ref: LegacyRef<ImperativePanelGroupHandle>) => {
    return (
        <div className="flex flex-1">
            <ResizablePanelGroup className="bg-white rounded-b-xl" ref={ref} direction="horizontal">
                <ResizablePanel defaultSize={0} order={1}></ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={26} defaultSize={100} className="bg-secondary relative" order={2}>
                    {
                        props.isloading && (
                            <div className="absolute z-10 opacity-20 w-full h-[75vh] gradient-animation shadow-lg" />
                        )
                    }
                    <div id="captureDiv" ref={props.captureRef} className={`max-h-[75vh] h-[75vh] ${props.isloading ? "overflow-y-hidden" : "overflow-y-auto"}`}>
                        <PreviewScreen html_code={props.code} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={0} order={3}></ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
})

UIBody.displayName = "UIBody"

export default UIBody