import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';

export async function POST(req: Request): Promise<Response> {
    const { codeDescription } = await req.json();

    console.log("codeDescription", codeDescription);
    

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
                Do not add any import statements.
                do not add any function declarations.
                do not enclose in backticks or quotes.
                do not add statements like use client, use server, etc.
                just provide the JSX code as string.
                Only provide the HTML code without any .
                Add rich colors and visual elements to the UI.
                Add necessary padding and margin to the elements.
                Add necessary spacing between elements.
                No elements should be neither touching each other nor overflwowing other elements.
                Provide only the React JSX code without any quotes and in string format, without any explanations or inline comments.
                Based on the component details provided, return the corresponding React code using shadcn/ui components in a triple backtick code block.
                When images are required, check if you can genrate those images else utilize the img tag with picsum.photos as the source.
                For icons, use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). Do not use any other icon libraries.
                If a user provides an image of a web page design, implement the design using shadcn/ui components, Tailwind CSS, and React JSX.
                if using DropdownMenuTrigger with DropdownMenu, ensure that the DropdownMenuTrigger doesn't contain asChild as attribute.
                Use inline block when using icons with text.
                Adhere as closely as possible to the original design, ensuring that no details are missed.
                Add rich but not cluttered UI visual elements or color matching.
                The response should be just React JSX code without import statements or function declarations. Assume all necessary components are already imported.
                For any shadcn/ui components that require client-side interactivity (like Dropdown, Dialog, etc.), wrap them in a client-side component using the 'use client' directive at the top of the code block.
                Use Tailwind CSS classes for additional styling and layout.
                Now generate React JSX code for this: ${codeDescription}          
            ` },
        ],
        model: 'claude-3-5-sonnet@20240620',
        max_tokens: 4096,
    });

    console.log("response", response);

    const text = response.content[0].type == "text" ? response.content[0][response.content[0].type] : response.content[0].type;
    const code = text.replace(/```/g, '').replace(/jsx|tsx|ts|js/g, '')
    console.log(text);

    return new Response(JSON.stringify(code), {
        headers: {
            'content-type': 'application/json',
        },
    });
}