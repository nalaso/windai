// WindAI is now Paddlewheel: the home page only announces the move.
const AGENTS = ["lead", "coder", "pm", "devops"];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#f4f2ee] px-6 text-center">
            <div className="flex items-end gap-4">
                {AGENTS.map((agent) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        key={agent}
                        src={`https://assets.paddlewheel.dev/landing/${agent}.png`}
                        alt=""
                        width={64}
                        className="h-auto w-16 [image-rendering:pixelated]"
                    />
                ))}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
                <span className="text-[#8a8580] line-through decoration-2">WindAI</span> is now{" "}
                <a href="https://pwhl.dev/e-windai" className="text-[#CC4410] hover:underline">
                    Paddlewheel
                </a>
            </h1>
        </main>
    );
}
