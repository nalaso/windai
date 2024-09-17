const components = `[Accordion,AccordionItem,AccordionTrigger,AccordionContent,AlertDialog,AlertDialogPortal,AlertDialogOverlay,AlertDialogTrigger,AlertDialogContent,AlertDialogHeader,AlertDialogFooter,AlertDialogTitle,AlertDialogDescription,AlertDialogAction,AlertDialogCancel,Alert,AlertTitle,AlertDescription,AspectRatio,Avatar,AvatarFallback,AvatarImage,Badge,Breadcrumb,BreadcrumbList,BreadcrumbItem,BreadcrumbLink,BreadcrumbPage,BreadcrumbSeparator,BreadcrumbEllipsis,Button,Calendar,Card,CardHeader,CardFooter,CardTitle,CardDescription,CardContent,Carousel,CarouselContent,CarouselItem,CarouselPrevious,CarouselNext,ChartContainer,ChartTooltip,ChartTooltipContent,ChartLegend,ChartLegendContent,Checkbox,Collapsible,CollapsibleContent,CollapsibleTrigger,Command,CommandDialog,CommandInput,CommandList,CommandEmpty,CommandGroup,CommandItem,CommandShortcut,CommandSeparator,ContextMenu,ContextMenuTrigger,ContextMenuContent,ContextMenuItem,ContextMenuCheckboxItem,ContextMenuRadioItem,ContextMenuLabel,ContextMenuSeparator,ContextMenuShortcut,ContextMenuGroup,ContextMenuPortal,ContextMenuSub,ContextMenuSubContent,ContextMenuSubTrigger,ContextMenuRadioGroup,Dialog,DialogPortal,DialogOverlay,DialogTrigger,DialogClose,DialogContent,DialogHeader,DialogFooter,DialogTitle,DialogDescription,Drawer,DrawerPortal,DrawerOverlay,DrawerTrigger,DrawerClose,DrawerContent,DrawerHeader,DrawerFooter,DrawerTitle,DrawerDescription,DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem,DropdownMenuCheckboxItem,DropdownMenuRadioItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuGroup,DropdownMenuPortal,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuRadioGroup,HoverCard,HoverCardTrigger,HoverCardContent,Input,InputOTP,InputOTPGroup,InputOTPSlot,InputOTPSeparator,Label,Menubar,MenubarMenu,MenubarTrigger,MenubarContent,MenubarItem,MenubarSeparator,MenubarLabel,MenubarCheckboxItem,MenubarRadioGroup,MenubarRadioItem,MenubarPortal,MenubarSubContent,MenubarSubTrigger,MenubarGroup,MenubarSub,MenubarShortcut,NavigationMenu,NavigationMenuList,NavigationMenuItem,NavigationMenuContent,NavigationMenuTrigger,NavigationMenuLink,NavigationMenuIndicator,NavigationMenuViewport,Pagination,PaginationContent,PaginationLink,PaginationItem,PaginationPrevious,PaginationNext,PaginationEllipsis,Popover,PopoverTrigger,PopoverContent,PopoverAnchor,Progress,RadioGroup,RadioGroupItem,ResizablePanelGroup,ResizablePanel,ResizableHandle,ScrollArea,ScrollBar,Select,SelectGroup,SelectValue,SelectTrigger,SelectContent,SelectLabel,SelectItem,SelectSeparator,SelectScrollUpButton,SelectScrollDownButton,Separator,Sheet,SheetPortal,SheetOverlay,SheetTrigger,SheetClose,SheetContent,SheetHeader,SheetFooter,SheetTitle,SheetDescription,Skeleton,Slider,Switch,Toaster,Table,TableHeader,TableBody,TableFooter,TableHead,TableRow,TableCell,TableCaption,Tabs,TabsList,TabsTrigger,TabsContent,Textarea,Toast,Toggle,ToggleGroup,ToggleGroupItem,Tooltip,TooltipTrigger,TooltipContent,TooltipProvider]`

export const getGenerationPrompt = (codeDescription: string) => {
    return (`
            Instructions:
            Act as a React developer using shadcn/ui components and TailwindCSS.
            Design pages or components with beautiful styles using shadcn/ui components wherever possible.
            Do not add any code comments, import statements,function declarations. Assume all necessary components are already imported.
            Do not enclose in quotes, backticks or markdown. Just provide the JSX code as string.
            Do not add statements like use client, use server, etc.
            Provide only the React JSX code without any quotes and in string format, without any explanations or inline comments.

            About the UI:
            Only use tailwind css while styling.
            Add rich colors and visual elements to the UI.
            Add necessary padding and margin to the elements.
            Add necessary spacing between each elements.
            No elements should be neither touching each other nor overflowing other elements unless required.

            Images: When images are required, check if you can genrate those images else utilize the img tag with picsum.photos as the source.

            Icons: For icons, use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). Do not use any other icon libraries.

            Tailwind themes:
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
            radius: "0.5rem"      

            Shadcn Components:
            Use shadcn components whenever possible. Go through the list of components and use them whenever necessary. The list of components are - ${components}

            Responsiveness:
            Ensure that the UI is responsive across all devices.
            Use Flexbox and Grid for layout and positioning.
            Use Breakpoint prefix like sm: for small screens, md: for medium screens, lg: for large screens, xl: for extra large screens with all the necessary elements. So generate classnames for all the Breakpoints to make the UI responsive.
            eg- cases like when there are cards in a row, ensure that the cards are stacked on top of each other on smaller screens.
            
            Fine-tune:
            Only use css variables when necessary else generate appropriate colors. Use of css variables is encouraged for background color and text color.
            Ensure than none of the element contains 'asChild' as attribute.
            When using icons with text, ensure that it is inside a Flex container with items center and add some gap between icon and the text so that icon and text are vertically aligned.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            Add rich but not cluttered UI visual elements or color matching.
            Ensure a visually consistent and appealing presentation across all devices.

            ----
            Now generate React JSX code for this: ${codeDescription}        
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

export const getModifierPromt = (precode: string, modifyDescription: string) => {
    return (`
            Instructions:
            Act as a React developer using shadcn/ui components and TailwindCSS.
            Design pages or components with beautiful styles using shadcn/ui components wherever possible.
            Do not add any code comments, import statements,function declarations. Assume all necessary components are already imported.
            Do not enclose in quotes, backticks or markdown. Just provide the JSX code as string.
            Do not add statements like use client, use server, etc.
            Provide only the React JSX code without any quotes and in string format, without any explanations or inline comments.

            About the UI:
            Only use tailwind css while styling.
            Add rich colors and visual elements to the UI.
            Add necessary padding and margin to the elements.
            Add necessary spacing between each elements.
            No elements should be neither touching each other nor overflowing other elements unless required.

            Images: When images are required, check if you can genrate those images else utilize the img tag with picsum.photos as the source.

            Icons: For icons, use the ionicons library eg- (<ion-icon size="large" name="logoname"></ion-icon>). Do not use any other icon libraries.

            Helpers:
            Only use tailwind css variables while styling background and text colors. Also asign component border radius to radius.
            All tailwind css variables eg are - [background, foreground, card, card-foreground, popover, popover-foreground, primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, destructive, destructive-foreground, border, input, ring, radius]
            Use shadcn components whenever possible. The list of components are - ${components}

            Responsiveness:
            Ensure that the UI is responsive across all devices.
            Use Flexbox and Grid for layout and positioning.
            Use Breakpoint prefix like sm: for small screens, md: for medium screens, lg: for large screens, xl: for extra large screens with all the necessary elements. So generate classnames for all the Breakpoints to make the UI responsive.
            eg- cases like when there are cards in a row, ensure that the cards are stacked on top of each other on smaller screens.

            Fine-tune:
            Only use css variables when necessary else generate appropriate colors. Use of css variables is encouraged for background color and text color.
            Ensure than none of the element contains 'asChild' as attribute.
            When using icons with text, ensure that it is inside a Flex container with items center and add some gap between icon and the text so that icon and text are vertically aligned.
            Adhere as closely as possible to the original design, ensuring that no details are missed.
            Add rich but not cluttered UI visual elements or color matching.
            Ensure a visually consistent and appealing presentation across all devices.

            ----
            Adhere as closely as possible to the original design, ensuring that no details are missed. Only make changes based on the description provided.
            Now modify React JSX code: ${precode} based on this description: ${modifyDescription}      
        `
    )
}