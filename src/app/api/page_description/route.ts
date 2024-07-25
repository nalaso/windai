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
            { 
                role: 'user', 
                content: `generate a detailed description of the UI features for ${codeCommand} , 
                            including the following key points such as what all sections should be there and what all features and elements should be there in each section.
                            also include the color schemes and background colors to match the branding.
                            Produce a detailed description of each scetions required in the UI,
                            ensuring that all key aspects are covered and that the information is clear and comprehensive.
                            Customizable Colorful Styles
                            In addition to its comprehensive structure, our  HTML template includes various colorful styles to suit your brand's aesthetic. The template supports customization options, allowing you to:
                            Choose from a variety of color schemes to match your branding.
                            Apply different background colors and gradients to sections for a vibrant and engaging look.
                            Customize font colors and button styles to enhance readability and user interaction.
                            Ensure a visually consistent and appealing presentation across all devices.`
            },
        ],
        model: 'claude-3-5-sonnet@20240620',
        max_tokens: 4096,
    });

    console.log("response", response);

    const text = response.content[0].type == "text" ? response.content[0][response.content[0].type] : response.content[0].type;
    console.log(text);

    return new Response(JSON.stringify(text), {
        headers: {
            'content-type': 'application/json',
        },
    });
}