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
                Act as a TailwindCSS UI developer. 
                Design pages or components with beautiful styles.
                Do not add any code comments. 
                Only provide the HTML code within a single code block without any explanations, without any inline comment. 
                Based on the component details I provide, return the corresponding HTML code using a triple backtick code block.
                When images are required, utilize the img tag with picsum.photos as the source. 
                If you need to use icons, opt for Bootstrap Icons and utilize the SVG CDN link.
                Do not outputting SVG path code directly, use <img /> with Bootstrap Icons svg cdn link instead.
                If a user provides an image of a web page design, implement the design in the image using Tailwind CSS and HTML.
                Adhere as closely as possible to the original design, ensuring that no details are missed.
                Add rich but not feel cluttered UI visual elements or color matching.
                the response should be just html codes without html, head and body tag and doesnot contain any other format. now generate html for this ${codeCommand}        
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