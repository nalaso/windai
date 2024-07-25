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

const tailwindCDN = `<style>
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
</style>
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
`;

export default function Home() {
  const [advancedCode, setCodeToDisplay] = useState<string>(`<h1 class="text-gray-500"></h1>`);
  const [simpleCode, setSimpleCode] = useState(`<h1 class="text-gray-500"></h1>`);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [codeCommand, setCodeCommand] = useState<string>("");
  const [loading, setLoading] = useState(false)

  const generateAdvancedCode = async () => {
    try {
      console.log("generateAdvancedCode");

      const description = await fetch('/api/page_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeCommand }),
      });

      const codeDescription = await description.json();
      console.log("advanced codeDescription", codeDescription);

      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeDescription }),
      });

      const response = await res.json();
      const readableCode = response + tailwindCDN;

      console.log("advanced code", readableCode);

      setCodeToDisplay(readableCode);
    } catch (e) {
      console.error(e);
    }
  }

  const generateSimpleCode = async () => {
    try {
      console.log("generateSimpleCode");

      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codeDescription: codeCommand }),
      });

      const response = await res.json();
      const readableCode = response + tailwindCDN;

      console.log("simple code", readableCode);

      setSimpleCode(readableCode);
    } catch (e) {
      console.error(e);
    }
  }

  const generateCode = async () => {
    setLoading(true);
    const promised = [generateSimpleCode(), generateAdvancedCode()];
    await Promise.all(promised);
    setLoading(false);
  }

  return (
    <main className="bg-white min-h-screen px-4">
      <Header openCode={() => setShowDialog(true)} />
      <div className="w-6/12 mx-auto p-3 rounded-2xl bg-gray-400 flex my-20 shadow-lg">
        <Input
          type="text"
          placeholder="Enter your code command"
          className="w-11/12 rounded-2xl-full bg-primary bg-gray-400 outline-none border-none text-black"
          value={codeCommand}
          onChange={(e) => setCodeCommand(e.target.value)}
        />
        <button
          className="w-1/12 bg-white text-primary rounded-md hover:bg-gray-100 hover:text-primary-dark transition-all duration-300"
          onClick={() => generateCode()}
        >
          {
            loading ? <ion-icon name="stop-circle-outline"></ion-icon> : <ion-icon name="send-outline"></ion-icon>
          }
        </button>
      </div>
      <div className="w-full h-full min-h-[70vh] flex justify-center gap-x-1 ">
        {/* <Sidebar>
        <div className="space-y-2">
          {advancedCode.map((c, i) => (
            <div
              key={i}
              className="w-full h-20 p-1 rounded-md bg-white border border-blue-600"
              onClick={() => setCodeToDisplay(c)}
            >
              v{i}
            </div>
          ))}
        </div>
      </Sidebar> */}


        <div className="w-full mb-20">
          <div className="w-10/12 m-auto">
            <p className="text-2xl font-bold my-3">UI Generated with advanced description</p>
            <div className="h-[80vh] overflow-auto">
              <PreviewScreen html_code={advancedCode.length<35 && loading? "Generating code..." : advancedCode} />
            </div>
          </div>
          <div className="w-10/12 mt-20 m-auto">
            <p className="text-2xl font-bold my-3">UI Generated with simple prompt</p>
            <div className="h-[80vh] overflow-auto">
              <PreviewScreen html_code={simpleCode.length<35 && loading? "Generating code..." : simpleCode} />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View Code.</DialogTitle>
            <div className="p-4 rounded bg-primary text-white my-2">
              {advancedCode}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
