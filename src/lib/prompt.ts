import { getComponents } from "./components"

const tailwindCssVariables = 
    `Tailwind themes:
    Only use tailwind css variables while styling background and text colors. Also asign component border radius to radius.
    eg- <p classNmae="bg-primary text-primary">Hello World</p>
    All necessary css variables eg are -
    background: "0 0% 100%",
    foreground: "240 10% 3.9%",
    card: "0 0% 100%",
    card-foreground: "240 10% 3.9%",
    popover: "0 0% 100%",
    popover-foreground: "240 10% 3.9%",
    primary: "240 5.9% 10%",
    primary-foreground: "0 0% 98%",
    secondary: "240 4.8% 95.9%",
    secondary-foreground: "240 5.9% 10%",
    muted: "240 4.8% 95.9%",
    muted-foreground: "240 3.8% 46.1%",
    accent: "240 4.8% 95.9%",
    accent-foreground: "240 5.9% 10%",
    destructive: "0 84.2% 60.2%",
    destructive-foreground: "0 0% 98%",
    border: "240 5.9% 90%",
    input: "240 5.9% 90%",
    ring: "240 10% 3.9%",
    radius: "0.5rem"`;

export const getGenerationPrompt = (uiType: string) => {
    return (`
            Instructions:
            Act as a React developer who is an expert in both javacript and UI/UX designing using ${uiType} components and TailwindCSS.
            Design pages or components with beautiful styles using ${uiType} components wherever possible.
            Do not enclose in quotes, backticks or markdown. Just provide the react code as string.
            Do not add statements like use client, use server, etc.
            Provide only the React code without any quotes and in string format, without any explanations or inline comments.
            The code should also include import statements with default export.
            The code should be functional and should be fully state controlled.
            End every js/ts statement with a semicolon. Make sure to include semicolon to import statements as well.
            Do not add explanations like here is the code, i have added the code etc. Just provide the react code.
            I need the response such that i can directly map it a file without any syntax errors.
            ${false ? "use typescript for the code. Do not define custom interface or types. just use predefined types like string, number etc " : "use javascript for the complete code"}

            eg of Code:
            import { useState } from 'react';
            other import statements;
            export default function component() {
                const [state, setState] = useState();
                // other states, hooks, functions here
                return (
                    <div>
                        <h1>Hello World</h1>
                    </div>
                )
            }

            About the UI:
            Only use tailwind css while styling.
            Add rich colors and visual elements to the UI.
            Add necessary padding and margin to the elements.
            Add necessary spacing between each elements.
            No elements should be neither touching each other nor overflowing other elements unless required.

            Images:
            When images are required, ${true?'check if you can genrate those images else utilize the img tag with picsum.photos as the source':''}.
            While using images, ensure that the images are of the correct size and resolution using the width and height attributes.

            Icons: 
            For icons, ${true?'use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). ion-icon is an global html context means no need to import anything':''}
            Do not use any other icon libraries.

            ${uiType==='shadcn-react'&&tailwindCssVariables}

            ${uiType} Components:
            Use ${uiType} components whenever possible. 
            Go through the list of components and use them whenever necessary. 
            Do not use hallucinated component names like (Flex,Box, etc) which are not available.
            The complete list of available components are - ${getComponents(uiType)}

            Responsiveness:
            Ensure that the UI is responsive across all devices.
            Use Breakpoint prefix like sm: for small screens, md: for medium screens, lg: for large screens, xl: for extra large screens with all the necessary elements. 
            So generate classnames for all the Breakpoints to make the UI responsive.
            eg- cases like when there are cards in a row, ensure that the cards are stacked on top of each other on smaller screens.
            
            Fine-tune:
            ${uiType==='shadcn-react'&&'Only use css variables when necessary else generate appropriate colors. Use of css variables is encouraged for background color and text color.'}
            Ensure than none of the element contains 'asChild' as attribute.
            Ensure no code like variable declaration or any other code is present outside the component function.
            When using icons with text, ensure that it is inside display flex with items center and add some gap between icon and the text so that icon and text are vertically aligned.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            Add rich but not cluttered UI visual elements or color matching.
            Ensure a visually consistent and appealing presentation across all devices.   

            -------------
            After generating the code, ensure the below is followed:
            - All comments and explanations are removed from the code.
            ${false && '- No custom interface or types are defined. Use predefined types like string, number etc.'}
        `
    )
}


export const getCreativePrompt = (prompt: string) => {
    return (`
            Generate a highly detailed description of the UI features for prompt- ${prompt}.
            Ensure that the design aligns closely with user choices and preferences.
            Include the following key points such as what all key sections/part should be there and what all features and elements should be there in each section.
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
    )
}

export const getBalancedPrompt = (prompt: string) => {
    return (`
            Generate a detailed description of the UI features for the prompt: ${prompt}. Ensure that the design 
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
            design is accurate to user choices and preferences.
        `
    )
}

export const getModifierPromt = (precode: string, modifyDescription: string, uiType: string) => {
    return (`
            Instructions:
            Act as a React developer who is an expert in both javacript and UI/UX designing using ${uiType} components and TailwindCSS.
            Design pages or components with beautiful styles using ${uiType} components wherever possible.
            Do not enclose in quotes, backticks or markdown. Just provide the JSX code as string.
            Do not add statements like use client, use server, etc.
            Provide only the React code without any quotes and in string format, without any explanations or inline comments.
            The code should also include import statements with default export.
            The code should be functional and should be fully state controlled.
            End every js/ts statement with a semicolon. Make sure to include semicolon to import statements as well.
            Do not add explanations like here is the code, i have added the code etc. Just provide the react code.
            I need the response such that i can directly map it a file without any syntax errors.
            ${false ? "use typescript for the code. Do not define custom interface or types. just use predefined types like string, number etc " : "use javascript for the code"}

            eg of Code:
            import { useState } from 'react';
            other import statements;
            export default function component() {
                const [state, setState] = useState();
                // other states, hooks, functions here
                return (
                    <div>
                        <h1>Hello World</h1>
                    </div>
                )
            }

            About the UI:
            Only use tailwind css while styling.
            Add rich colors and visual elements to the UI.
            Add necessary padding and margin to the elements.
            Add necessary spacing between each elements.
            No elements should be neither touching each other nor overflowing other elements unless required.

            Images: 
            When images are required, ${true?'check if you can genrate those images else utilize the img tag with picsum.photos as the source':''}.
            While using images, ensure that the images are of the correct size and resolution using the width and height attributes.

            Icons: 
            For icons, ${true?'use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). ion-icon is an global html context means no need to import anything':''}
            Do not use any other icon libraries.

            Helpers:
            ${uiType==='shadcn-react'&&'Only use tailwind css variables while styling background and text colors. Also asign component border radius to radius.All tailwind css variables eg are - [background, foreground, card, card-foreground, popover, popover-foreground, primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, destructive, destructive-foreground, border, input, ring, radius]'}
            Use ${uiType} components whenever possible.
            Go through the list of components and use them whenever necessary.
            Do not use hallucinated component names like (Flex,Box, etc) which are not available.
            The complete list of available components are - ${getComponents(uiType)}

            Responsiveness:
            Ensure that the UI is responsive across all devices.
            Use Breakpoint prefix like sm: for small screens, md: for medium screens, lg: for large screens, xl: for extra large screens with all the necessary elements. 
            So generate classnames for all the Breakpoints to make the UI responsive.
            eg- cases like when there are cards in a row, ensure that the cards are stacked on top of each other on smaller screens.

            Fine-tune:
            ${uiType==='shadcn-react'&&'Only use css variables when necessary else generate appropriate colors. Use of css variables is encouraged for background color and text color.'}
            Ensure than none of the element contains 'asChild' as attribute.
            Ensure no code like variable declaration or any other code is present outside the component function.
            When using icons with text, ensure that it is inside display flex with items center and add some gap between icon and the text so that icon and text are vertically aligned.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            Add rich but not cluttered UI visual elements or color matching.
            Ensure a visually consistent and appealing presentation across all devices.   
        `
    )
}

export const getScreenshotPrompt = (codeDescription: string, properties: string) => {
    return (`
            Instructions:
            Act as a React developer who is an expert in both javacript and UI/UX designing using TailwindCSS.
            Design the exact react page of the provided image and calculated properties using tailwindcss.
            Do not enclose in quotes, backticks or markdown. Just provide the react code as string.
            Do not add statements like use client, use server, etc.
            Provide only the React code without any quotes and in string format, without any explanations or inline comments.
            The code should also include import statements with default export.
            The code should be functional and should be fully state controlled.
            End every js/ts statement with a semicolon. Make sure to include semicolon to import statements as well.
            Do not add explanations like here is the code, i have added the code etc. Just provide the react code.
            I need the response such that i can directly map it a file without any syntax errors.
            ${false ? "use typescript for the code. Do not define custom interface or types. just use predefined types like string, number etc " : "use javascript for the code"}

            Images:
            When images are required, ${true?'check if you can genrate those images else utilize the img tag with picsum.photos as the source':''}.
            While using images, ensure that the images are of the correct size and resolution using the width and height attributes.

            Icons: 
            For icons, ${true?'use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). ion-icon is an global html context means no need to import anything':''}
            Do not use any other icon libraries.

            Responsiveness:
            Primary focus should be on recreating the exact image of component.
            Also ensure that the UI is responsive across all devices.
            Use Breakpoint prefix like sm: for small screens, md: for medium screens, lg: for large screens, xl: for extra large screens with all the necessary elements. 
            So generate classnames for all the Breakpoints to make the UI responsive.
            eg- cases like when there are cards in a row, ensure that the cards are stacked on top of each other on smaller screens.
            
            -------------
            now generate react code to replicate the provided image. Generate detailed analysis before coming up with the jsx. 
            Ensure that no element is missed and the generated code is the exact replica of the image.
            If you think the properties are not matching with the image then generate element properties based on the image.
            Assign properties of the body tag to a div with class name 'container' and add all the elements inside the div.
            userprompt: ${codeDescription}
            -------------
            Refer the properties below to refer colors of the elements.
            properties: ${properties}
    `)
}

export const getElementProperty = () => {
    return (`
        Describe this UI in accurate details in point wise. When you reference a UI element put its name and bounding box in the format: [object name (y_min, x_min, y_max, x_max)]. Also Describe the color of the elements.
        Do not generate html or react code just give me the properties of each element in this format.
        For the given image, calculate the properties of each element and provide the details for each element.
        Also include body tag. Assign maximum occuring color as background color of body.
        for icons calculate the size of the icon.
        Response Format:
        1. [element description (y_min, x_min, y_max, x_max)]
            - color: value1
            - background color: value2

        Also for each elements like input, button etc let the element description be its title or placholder to identify it and provide its properties like border, border radius, padding, margin etc along with color and background color
    `)
}

export const getRefienedElementProperty = (description:string) => {
    return (`
        Compare the described UI elements with the provided image and identify any missing elements or inaccuracies. Also Describe the color of the elements. Provide a refined and accurate description of the UI elements based on this comparison. Here is the initial description: ${description}
        Add properties for the missing elements and correct any inaccuracies in the initial description. Ensure that the refined description is accurate and comprehensive, covering all key aspects of the UI elements.
        Do not generate html or react code just give me the properties of each element in this format.
        Also include body tag. Assign maximum occuring color as background color of body.
        Also for each elements like input, button etc provide its properties like border, border radius, padding, margin etc.
        for icons calculate the size of the icon.
    `)
}

export const getOptimizerPrompt = () => {
    return (`
        Instructions:
        - Remove all the comments and explanations from the code.
        - Do not use custom interface or types. Use predefined types like string, number etc.
    `);
}