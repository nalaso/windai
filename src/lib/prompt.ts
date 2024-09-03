export const getGenerationPrompt = (codeDescription: string) => {
    return (`
            Act as a React developer using shadcn/ui components and TailwindCSS.
            Design pages or components with beautiful styles using shadcn/ui components wherever possible.
            Do not add any code comments.
            Do not add any import statements.
            do not add any function declarations.
            do not enclose in backticks or quotes.
            do not add statements like use client, use server, etc.
            just provide the JSX code as string.
            DO not provide any explanation or comments like here is the code.
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
            if using CollapsibleTrigger with Collapsible, ensure that the CollapsibleTrigger doesn't contain asChild as attribute.
            When using icons with text, ensure that it is inside a Flex container with items center and add some gap between icon and the text.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            Add rich but not cluttered UI visual elements or color matching.
            Always generate text color based on its bg color. So when bg color is dark, text color should be light and vice versa.
            The response should be just React JSX code without import statements or function declarations. Assume all necessary components are already imported.
            For any shadcn/ui components that require client-side interactivity (like Dropdown, Dialog, etc.), wrap them in a client-side component using the 'use client' directive at the top of the code block.
            Use Tailwind CSS classes for additional styling and layout. use tailwind propertied to create responsive design which works for desktop, tablet, and mobile. Responsive design is the highest priority.eg-if there is card componenets in row, it should be in column in mobile view.
            Now generate React JSX code for this: ${codeDescription}        
        `
    )
}


export const getCreativePrompt = (prompt: string) => {
    return (`
            generate a detailed description of the UI features for prompt- ${prompt}.
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

export const getModifierPromt = (precode: string, modifyDescription: string) => {
    return (`
            Act as a React developer using shadcn/ui components and TailwindCSS.
            Design pages or components with beautiful styles using shadcn/ui components wherever possible.
            Most important - Dont change the code unnecessarily, just modify the code to match the description.
            The desrired description is provided at the end of the prompt.
            Also if the requesting description is not clear or isn't possible to implement, then return the code as it is.
            Do not add any code comments.
            Do not add any import statements.
            do not add any function declarations.
            do not enclose in backticks or quotes.
            do not add statements like use client, use server, etc.
            just provide the JSX code as string.
            DO not provide any explanation or comments like here is the code.
            No elements should be neither touching each other nor overflwowing other elements.
            Provide only the React JSX code without any quotes and in string format, without any explanations or inline comments.
            Based on the component details provided, return the corresponding React code using shadcn/ui components in a triple backtick code block.
            When images are required, check if you can genrate those images else utilize the img tag with picsum.photos as the source.
            For icons, use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). Do not use any other icon libraries.
            If a user provides an image of a web page design, implement the design using shadcn/ui components, Tailwind CSS, and React JSX.
            if using DropdownMenuTrigger with DropdownMenu, ensure that the DropdownMenuTrigger doesn't contain asChild as attribute.
            if using CollapsibleTrigger with Collapsible, ensure that the CollapsibleTrigger doesn't contain asChild as attribute.
            When using icons with text, ensure that it is inside a Flex container with items center and add some gap between icon and the text.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            The response should be just React JSX code without import statements or function declarations. Assume all necessary components are already imported.
            Use Tailwind CSS classes for additional styling and layout.
            Now modify React JSX code: ${precode} based on this description: ${modifyDescription}      
        `
    ) 
}