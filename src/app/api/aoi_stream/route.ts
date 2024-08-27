import { createAzure } from '@ai-sdk/azure';
import { generateText, streamText } from 'ai'

export async function POST(req: Request): Promise<Response> {
    const  {prompt}  = await req.json();
    const codeDescription = prompt;

    const azure = createAzure({
        resourceName: process.env.Azure_Resouce_Name,
        apiKey: process.env.Azure_Api_Key
    });

    const content = `
                Act as a React developer using shadcn/ui components and TailwindCSS.
                Design pages or components with beautiful styles using shadcn/ui components wherever possible.
                Do not add any code comments.
                Do not add any import statements.
                do not add any function declarations.
                do not enclose in backticks or quotes.
                do not include statements like 'use client', 'use server', etc.
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
            ` 

    const result = await streamText({
        model: azure(process.env.Azure_Model_Name!),
        prompt: content
    })

    return result.toAIStreamResponse();
}