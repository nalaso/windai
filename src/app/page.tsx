"use client";
// WindAI is now Paddlewheel: the old home page shows for a moment, a Paddlewheel
// agent walks in and punches the prompt box, the old page falls apart, and the
// notice is left. Visitors who prefer reduced motion get the notice straight away.
import { useEffect, useState } from "react";

const ASSETS = "https://assets.paddlewheel.dev/landing";
const AGENTS = ["lead", "coder", "pm", "devops"];
const CHIPS = ["login page for netflix", "product detail card for sneakers", "ecommerce checkout page", "dashboard for sales data", "Instagram App UI clone"];
const LINK = "https://pwhl.dev/w-windai";

type Phase = "idle" | "walk" | "punch" | "break" | "done";
// How long each phase lasts before the next one starts (ms).
const TIMELINE: [Phase, number][] = [["idle", 1200], ["walk", 2200], ["punch", 1500], ["break", 1100], ["done", 0]];

export default function Home() {
    const [phase, setPhase] = useState<Phase>("idle");

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setPhase("done");
            return;
        }
        const timers: ReturnType<typeof setTimeout>[] = [];
        let at = 0;
        for (const [name, length] of TIMELINE) {
            timers.push(setTimeout(() => setPhase(name), at));
            at += length;
        }
        return () => timers.forEach(clearTimeout);
    }, []);

    const broken = phase === "break" || phase === "done";
    // Each piece of the old page falls on its own path once the box is hit.
    const fall = (i: number) => (broken ? `wa-fall wa-fall-${i % 4}` : "");

    return (
        <main className={`relative min-h-screen overflow-hidden bg-white ${phase === "punch" ? "wa-shake" : ""}`}>
            <style>{`
                .wa-sprite { width: 96px; height: 192px; background-size: 576px 192px; image-rendering: pixelated; }
                .wa-walk { background-image: url(${ASSETS}/lead-walk-right.png); animation: wa-frames .6s steps(6) infinite; }
                .wa-punch { background-image: url(${ASSETS}/lead-punch-right.png); animation: wa-frames .5s steps(6) 3; }
                @keyframes wa-frames { from { background-position: 0 0 } to { background-position: -576px 0 } }
                .wa-enter { animation: wa-enter 2.2s linear forwards; }
                @keyframes wa-enter { from { transform: translateX(-100vw) } to { transform: translateX(6px) } }
                .wa-shake { animation: wa-shake .25s linear 6; }
                @keyframes wa-shake { 0%,100% { transform: translate(0,0) } 25% { transform: translate(-6px,3px) } 50% { transform: translate(5px,-4px) } 75% { transform: translate(-3px,-2px) } }
                .wa-fall { transition: transform 1s cubic-bezier(.5,0,.9,.5), opacity 1s ease-in; opacity: 0; pointer-events: none; }
                .wa-fall-0 { transform: translate(-30vw,110vh) rotate(-35deg); }
                .wa-fall-1 { transform: translate(20vw,120vh) rotate(25deg); }
                .wa-fall-2 { transform: translate(-10vw,130vh) rotate(60deg); }
                .wa-fall-3 { transform: translate(35vw,115vh) rotate(-50deg); }
                .wa-notice { animation: wa-notice .7s cubic-bezier(.2,.9,.3,1.3) both; }
                @keyframes wa-notice { from { opacity: 0; transform: scale(.85) } to { opacity: 1; transform: scale(1) } }
            `}</style>

            {phase !== "done" && (
                <>
                    <header className="flex items-center justify-between px-6 py-5">
                        <div className={`flex items-center gap-2 text-2xl font-bold ${fall(0)}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="icon.png" alt="" width={28} />
                            WindAI
                        </div>
                        <div className="flex gap-3">
                            <span className={`rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white ${fall(1)}`}>Github</span>
                            <span className={`rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white ${fall(2)}`}>Sign In</span>
                        </div>
                    </header>

                    <section className="flex flex-col items-center px-4 pt-16 text-center sm:pt-24">
                        <h1 className={`text-5xl font-bold tracking-tight sm:text-7xl ${fall(3)}`}>Generate. Ship. Done.</h1>
                        <p className={`mt-6 text-lg ${fall(1)}`}>Generate UI with shadcn/nextui from text prompts or images.</p>

                        <div className="relative mt-10 w-full max-w-xl">
                            {(phase === "walk" || phase === "punch") && (
                                <div className="absolute bottom-0 right-full">
                                    <div className={`wa-sprite ${phase === "walk" ? "wa-walk wa-enter" : "wa-punch"}`} style={phase === "punch" ? { transform: "translateX(6px)" } : undefined} />
                                </div>
                            )}
                            <div className={`rounded-xl bg-black p-4 text-left text-white shadow-lg ${phase === "punch" ? "wa-shake" : ""} ${fall(2)}`}>
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-500">Type a message...</span>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></svg>
                                    {["Shadcn/UI", "Ion Icons", "Public"].map((label) => (
                                        <span key={label} className="rounded-md border border-zinc-700 px-3 py-1.5">{label} ⇕</span>
                                    ))}
                                    <span className="rounded-md bg-zinc-800 px-3 py-1.5">LLM</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex max-w-4xl flex-wrap justify-center gap-3">
                            {CHIPS.map((chip, i) => (
                                <span key={chip} className={`rounded-md bg-zinc-100 px-2.5 py-1.5 text-sm font-medium ${fall(i)}`}>{chip} ↗</span>
                            ))}
                        </div>
                    </section>
                </>
            )}

            {phase === "done" && (
                <div className="wa-notice flex min-h-screen flex-col items-center justify-center gap-10 bg-[#f4f2ee] px-6 text-center">
                    <div className="flex items-end gap-4">
                        {AGENTS.map((agent) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={agent} src={`${ASSETS}/${agent}.png`} alt="" width={64} className="h-auto w-16 [image-rendering:pixelated]" />
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
                        <span className="text-[#8a8580] line-through decoration-2">WindAI</span> is now{" "}
                        <a href={LINK} className="text-[#CC4410] hover:underline">Paddlewheel</a>
                    </h1>
                    <a href={LINK} className="-mt-4 font-mono text-lg text-[#CC4410] underline underline-offset-4">pwhl.dev/w-windai</a>
                </div>
            )}
        </main>
    );
}
