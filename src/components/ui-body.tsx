"use client"
import { forwardRef, LegacyRef, useRef } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { ImperativePanelGroupHandle } from "react-resizable-panels"
import PreviewScreen from "./preview-screen"
import html2canvas from 'html2canvas';

const UIBody = forwardRef((props: { code: string, captureRef :LegacyRef<HTMLDivElement> }, ref: LegacyRef<ImperativePanelGroupHandle>) => {

    return (
        <div className="flex flex-1">
            <ResizablePanelGroup className="bg-white rounded-b-xl" ref={ref} direction="horizontal">
                <ResizablePanel defaultSize={0} order={1}></ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={26} defaultSize={100} className="bg-secondary" order={2}>
                    <div ref={props.captureRef} className="max-h-[75vh] h-[75vh] overflow-y-auto">
                        <PreviewScreen html_code={props.code} />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={0} order={3}></ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
})

export default UIBody