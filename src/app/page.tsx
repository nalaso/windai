"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import PreviewScreen from "@/components/preview-screen";
import { Input } from "@/components/ui/input";


export default function Home() {
  const [code, setCode] = useState<string[]>([
    `<h1 class="text-red-500">Hello World</h1>`,
  ]);
  const [codeToDisplay, setCodeToDisplay] = useState<string>(code[0] || "");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [codeCommand, setCodeCommand] = useState<string>("");

  const useMakeCopilotReadable = (code: string) => {
    return code
  }

  const readableCode = useMakeCopilotReadable(codeToDisplay);

  const generateCode = async () => {
    try {
      
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeCommand }),
      });
  
      const response = await res.json();
      // const message = await stream.finalMessage();
      // console.log(message);
      // setCode([...code, response.code]);
      console.log(response);
      const tailwindCDN = `<style>
                            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
                          </style>`;
      setCodeToDisplay(response+tailwindCDN);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <main className="bg-white min-h-screen px-4">
    <Header openCode={() => setShowDialog(true)} />
    <div className="w-full h-full min-h-[70vh] flex justify-between gap-x-1 ">
      <Sidebar>
        <div className="space-y-2">
          {code.map((c, i) => (
            <div
              key={i}
              className="w-full h-20 p-1 rounded-md bg-white border border-blue-600"
              onClick={() => setCodeToDisplay(c)}
            >
              v{i}
            </div>
          ))}
        </div>
      </Sidebar>

      <div className="w-10/12">
        <PreviewScreen html_code={codeToDisplay || ""} />
      </div>
    </div>
    <div className="w-8/12 mx-auto p-1 rounded-full bg-primary flex my-4 outline-0">
      <Input
        type="text"
        placeholder="Enter your code command"
        className="w-10/12 p-6 rounded-l-full  outline-0 bg-primary text-white"
        value={codeCommand}
        onChange={(e) => setCodeCommand(e.target.value)}
      />
      <button
        className="w-2/12 bg-white text-primary rounded-r-full"
        onClick={() => generateCode()}
      >
        Generate
      </button>
    </div>
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Code.</DialogTitle>
          <DialogDescription>
            You can use the following code to start integrating into your
            application.
          </DialogDescription>
          <div className="p-4 rounded bg-primary text-white my-2">
            {readableCode}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </main>
  );
}
