import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';

export async function POST(req: Request): Promise<Response> {
    const { codeCommand } = await req.json();

    console.log("codeCommand", codeCommand);
    

    const projectId = 'agent-427709';
    const region = 'us-east5';

    const anthropic = new AnthropicVertex({
        projectId,
        region,
    });

    const response = await anthropic.messages.create({
        messages: [
            { role: 'user', content: `
                Act as a React developer using shadcn/ui components and TailwindCSS.
                Design pages or components with beautiful styles using shadcn/ui components wherever possible.
                Do not add any code comments.
                Provide only the React JSX code without any quotes and language mentioned, without any explanations or inline comments.
                Based on the component details provided, return the corresponding React code using shadcn/ui components in a triple backtick code block.
                When images are required, utilize the img tag with picsum.photos as the source.
                For icons, use the Lucide React library, which is compatible with shadcn/ui. Import icons from 'lucide-react' and use them as components.
                Do not output SVG path code directly; use Lucide React components instead.
                If a user provides an image of a web page design, implement the design using shadcn/ui components, Tailwind CSS, and React JSX.
                Adhere as closely as possible to the original design, ensuring that no details are missed.
                Add rich but not cluttered UI visual elements or color matching.
                The response should be just React JSX code without import statements or function declarations. Assume all necessary components are already imported.
                For any shadcn/ui components that require client-side interactivity (like Dropdown, Dialog, etc.), wrap them in a client-side component using the 'use client' directive at the top of the code block.
                Use Tailwind CSS classes for additional styling and layout.
                Now generate React JSX code for this: ${codeCommand}        
            ` },
        ],
        model: 'claude-3-5-sonnet@20240620',
        max_tokens: 4096,
    });

    console.log("response", response);

    const text = response.content[0].type == "text" ? response.content[0][response.content[0].type] : response.content[0].type;

    return new Response(JSON.stringify(text), {
        headers: {
            'content-type': 'application/json',
        },
    });
}