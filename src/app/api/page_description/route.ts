import { AnthropicVertex } from '@anthropic-ai/vertex-sdk';

const genrateContent = (prompt:string, type:string) => {
    if (type=="creative") {
        return `generate a detailed description of the UI features for prompt- ${prompt}.
                include the following key points such as what all key sections/part should be there and what all features and elements should be there in each section.
                also include the color schemes and background colors to match the branding.
                Produce a detailed description of each component required in the UI,
                ensuring that all key aspects are covered and that the information is clear and comprehensive.
                Customizable Colorful Styles
                In addition to its comprehensive structure, our  HTML template includes various colorful styles to suit your brand's aesthetic. The template supports customization options, allowing you to:
                Choose from a variety of color schemes to match your branding.
                Apply different background colors and gradients to sections for a vibrant and engaging look.
                Customize font colors and button styles to enhance readability and user interaction.
                Ensure a visually consistent and appealing presentation across all devices.
                eg1 - if its a landing page - generate description for elements like header, pricing, contactus, faq, features, footer, testimonials etc.
                eg2 - if its a login page - generate description for forget password, oauth providers like google, microsoft, signup, terms accepting checkbox.
                eg3 - if its a music player - generate description for detailed sidebar inclduing different nav items like playlists, settings, etc, sticking bottom music preview, header with search , rpofile, body with different sections like recomended, new , most liked , with approriate icons to be placed etc.
                depending on the prompt asked generates detailed description based on the attributes that is relevant for the prompt.
                `
    }else{
        return  `"Generate a detailed description of the UI features for the prompt: ${prompt}. Ensure that the design 
        aligns closely with user choices and preferences. Include the following key points: Key Sections and Features: 
        Describe the essential sections or parts of the UI. Specify how each element should be placed. 
        If you are aware of the ui of the application the user is asking then create exact ui without sompremising the theme and icons.
        Color scheme - if use ask for existing specific application like netflix, youtube then try to develop application based on that exact theme. 
        Color Schemes and Branding: Suggest color schemes and background colors that match the branding. 
        Also make user the text color is readable based on the background color.
        Provide customization options for color schemes, background colors, gradients, font colors, and button styles.
        Component Descriptions: Produce a detailed description of each UI component. Ensure clarity and comprehensiveness 
        in covering all key aspects. Ensure a visually consistent and appealing presentation across all devices. Example Scenarios: 
        If user ask's a landing page, describe elements such as the header, pricing, contact us, FAQ, features, footer, testimonials, etc. 
        If user ask's a login page, describe elements such as forget password, OAuth providers (Google, Microsoft), signup, terms accepting 
        checkbox, etc. If user ask's a music player, describe elements such as a detailed sidebar with navigation items (playlists, settings), 
        a sticky bottom music preview, a header with search and profile, a body with sections like recommended, new, most liked, with 
        appropriate icons. Generate the detailed description based on the attributes that are relevant to the given prompt, ensuring the 
        design is accurate to user choices and preferences."
`
    }
}

export async function POST(req: Request): Promise<Response> {
    const { codeCommand, type } = await req.json();
    
    const projectId = process.env.Vertex_Ai_ProjectID;
    const region = process.env.Vertex_Ai_Region;

    const anthropic = new AnthropicVertex({
        projectId,
        region,
    });

    const response = await anthropic.messages.create({
        messages: [
            {
                role: 'user',
                content: genrateContent(codeCommand, type)
            },
        ],
        model: 'claude-3-5-sonnet@20240620',
        max_tokens: 4096,
    });

    const text = response.content[0].type == "text" ? response.content[0][response.content[0].type] : response.content[0].type;

    return new Response(JSON.stringify(text), {
        headers: {
            'content-type': 'application/json',
        },
    });
}