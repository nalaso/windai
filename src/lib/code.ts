export const embededCode = (htmlCode:string, uiType: string) => {
    if(uiType === "shadcn-react"){
        return shadcnCode(htmlCode);
    }else if(uiType === "nextui-react"){        
        return nextUICode(htmlCode);
    }
}

const nextUICode = (htmlCode:string) => {

    const capitalizedTags = new Set<string>();

    // Replace HTML tags with capitalized component names and collect them
    const jsxCode = htmlCode.replace(/<([A-Z][A-Za-z]*)\b[^>]*>/g, (match:any, p1:any) => {
        capitalizedTags.add(p1);
        return match;
    });

    const Comp = Array.from(capitalizedTags);

    const importCode = `import { ${Comp.join(", ")} } from "@nextui-org/react";`;


    return `
${importCode}

const Component: React.FC = () => {
return (
${jsxCode}
);
}

export default Component;`;
}

const shadcnCode = (reactCode:string) => {
    const componentToModuleMap = {
        Accordion: "accordion",
        AccordionItem: "accordion",
        AccordionTrigger: "accordion",
        AccordionContent: "accordion",

        AlertDialog: "alert-dialog",
        AlertDialogPortal: "alert-dialog",
        AlertDialogOverlay: "alert-dialog",
        AlertDialogTrigger: "alert-dialog",
        AlertDialogContent: "alert-dialog",
        AlertDialogHeader: "alert-dialog",
        AlertDialogFooter: "alert-dialog",
        AlertDialogTitle: "alert-dialog",
        AlertDialogDescription: "alert-dialog",
        AlertDialogAction: "alert-dialog",
        AlertDialogCancel: "alert-dialog",

        Alert: "alert",
        AlertTitle: "alert",
        AlertDescription: "alert",

        AspectRatio: "aspect-ratio",

        Avatar: "avatar",
        AvatarFallback: "avatar",
        AvatarImage: "avatar",

        Badge: "badge",

        Breadcrumb: "breadcrumb",
        BreadcrumbList: "breadcrumb",
        BreadcrumbItem: "breadcrumb",
        BreadcrumbLink: "breadcrumb",
        BreadcrumbPage: "breadcrumb",
        BreadcrumbSeparator: "breadcrumb",
        BreadcrumbEllipsis: "breadcrumb",

        Button: "button",

        Calendar: "calendar",

        Card: "card",
        CardHeader: "card",
        CardFooter: "card",
        CardTitle: "card",
        CardDescription: "card",
        CardContent: "card",

        Carousel: "carousel",
        CarouselContent: "carousel",
        CarouselItem: "carousel",
        CarouselPrevious: "carousel",
        CarouselNext: "carousel",

        ChartContainer: "chart",
        ChartTooltip: "chart",
        ChartTooltipContent: "chart",
        ChartLegend: "chart",
        ChartLegendContent: "chart",

        Checkbox: "checkbox",

        Collapsible: "collapsible",
        CollapsibleContent: "collapsible",
        CollapsibleTrigger: "collapsible",

        Command: "command",
        CommandDialog: "command",
        CommandInput: "command",
        CommandList: "command",
        CommandEmpty: "command",
        CommandGroup: "command",
        CommandItem: "command",
        CommandShortcut: "command",
        CommandSeparator: "command",

        ContextMenu: "context-menu",
        ContextMenuTrigger: "context-menu",
        ContextMenuContent: "context-menu",
        ContextMenuItem: "context-menu",
        ContextMenuCheckboxItem: "context-menu",
        ContextMenuRadioItem: "context-menu",
        ContextMenuLabel: "context-menu",
        ContextMenuSeparator: "context-menu",
        ContextMenuShortcut: "context-menu",
        ContextMenuGroup: "context-menu",
        ContextMenuPortal: "context-menu",
        ContextMenuSub: "context-menu",
        ContextMenuSubContent: "context-menu",
        ContextMenuSubTrigger: "context-menu",
        ContextMenuRadioGroup: "context-menu",

        Dialog: "dialog",
        DialogPortal: "dialog",
        DialogOverlay: "dialog",
        DialogTrigger: "dialog",
        DialogClose: "dialog",
        DialogContent: "dialog",
        DialogHeader: "dialog",
        DialogFooter: "dialog",
        DialogTitle: "dialog",
        DialogDescription: "dialog",

        Drawer: "drawer",
        DrawerPortal: "drawer",
        DrawerOverlay: "drawer",
        DrawerTrigger: "drawer",
        DrawerClose: "drawer",
        DrawerContent: "drawer",
        DrawerHeader: "drawer",
        DrawerFooter: "drawer",
        DrawerTitle: "drawer",
        DrawerDescription: "drawer",

        DropdownMenu: "dropdown-menu",
        DropdownMenuTrigger: "dropdown-menu",
        DropdownMenuContent: "dropdown-menu",
        DropdownMenuItem: "dropdown-menu",
        DropdownMenuCheckboxItem: "dropdown-menu",
        DropdownMenuRadioItem: "dropdown-menu",
        DropdownMenuLabel: "dropdown-menu",
        DropdownMenuSeparator: "dropdown-menu",
        DropdownMenuShortcut: "dropdown-menu",
        DropdownMenuGroup: "dropdown-menu",
        DropdownMenuPortal: "dropdown-menu",
        DropdownMenuSub: "dropdown-menu",
        DropdownMenuSubContent: "dropdown-menu",
        DropdownMenuSubTrigger: "dropdown-menu",
        DropdownMenuRadioGroup: "dropdown-menu",

        HoverCard: "hover-card",
        HoverCardTrigger: "hover-card",
        HoverCardContent: "hover-card",

        Input: "input",

        InputOTP: "input-otp",
        InputOTPGroup: "input-otp",
        InputOTPSlot: "input-otp",
        InputOTPSeparator: "input-otp",

        Label: "label",

        Menubar: "menubar",
        MenubarMenu: "menubar",
        MenubarTrigger: "menubar",
        MenubarContent: "menubar",
        MenubarItem: "menubar",
        MenubarSeparator: "menubar",
        MenubarLabel: "menubar",
        MenubarCheckboxItem: "menubar",
        MenubarRadioGroup: "menubar",
        MenubarRadioItem: "menubar",
        MenubarPortal: "menubar",
        MenubarSubContent: "menubar",
        MenubarSubTrigger: "menubar",
        MenubarGroup: "menubar",
        MenubarSub: "menubar",
        MenubarShortcut: "menubar",

        NavigationMenu: "navigation-menu",
        NavigationMenuList: "navigation-menu",
        NavigationMenuItem: "navigation-menu",
        NavigationMenuContent: "navigation-menu",
        NavigationMenuTrigger: "navigation-menu",
        NavigationMenuLink: "navigation-menu",
        NavigationMenuIndicator: "navigation-menu",
        NavigationMenuViewport: "navigation-menu",

        Pagination: "pagination",
        PaginationContent: "pagination",
        PaginationLink: "pagination",
        PaginationItem: "pagination",
        PaginationPrevious: "pagination",
        PaginationNext: "pagination",
        PaginationEllipsis: "pagination",

        Popover: "popover",
        PopoverTrigger: "popover",
        PopoverContent: "popover",
        PopoverAnchor: "popover",

        Progress: "progress",

        RadioGroup: "radio-group",
        RadioGroupItem: "radio-group",

        ResizablePanelGroup: "resizable",
        ResizablePanel: "resizable",
        ResizableHandle: "resizable",

        ScrollArea: "scroll-area",
        ScrollBar: "scroll-area",

        Select: "select",
        SelectGroup: "select",
        SelectValue: "select",
        SelectTrigger: "select",
        SelectContent: "select",
        SelectLabel: "select",
        SelectItem: "select",
        SelectSeparator: "select",
        SelectScrollUpButton: "select",
        SelectScrollDownButton: "select",

        Separator: "separator",

        Sheet: "sheet",
        SheetPortal: "sheet",
        SheetOverlay: "sheet",
        SheetTrigger: "sheet",
        SheetClose: "sheet",
        SheetContent: "sheet",
        SheetHeader: "sheet",
        SheetFooter: "sheet",
        SheetTitle: "sheet",
        SheetDescription: "sheet",

        Skeleton: "skeleton",

        Slider: "slider",

        Switch: "switch",

        Toaster: "sonner",

        Table: "table",
        TableHeader: "table",
        TableBody: "table",
        TableFooter: "table",
        TableHead: "table",
        TableRow: "table",
        TableCell: "table",
        TableCaption: "table",

        Tabs: "tabs",
        TabsList: "tabs",
        TabsTrigger: "tabs",
        TabsContent: "tabs",

        Textarea: "textarea",

        Toast: "toast",

        Toggle: "toggle",

        ToggleGroup: "toggle-group",
        ToggleGroupItem: "toggle-group",

        Tooltip: "tooltip",
        TooltipTrigger: "tooltip",
        TooltipContent: "tooltip",
        TooltipProvider: "tooltip",
    };

    const capitalizedTags = new Set<string>();

    // Replace HTML tags with capitalized component names and collect them
    const jsxCode = reactCode.replace(/<([A-Z][A-Za-z]*)\b[^>]*>/g, (match:any, p1:any) => {
        capitalizedTags.add(p1);
        return match;
    });

    // Group components by their module paths and generate import statements
    const importStatements = Array.from(capitalizedTags)
        .reduce((acc: Record<string, string[]>, tag: string) => {
            const modulePath = "@/components/ui/"+componentToModuleMap[tag as keyof typeof componentToModuleMap];
            if (modulePath) {
                if (!acc[modulePath]) {
                    acc[modulePath] = [];
                }
                acc[modulePath].push(tag);
            }
            return acc;
        }, {});

    // Create import statements for each module path and its components
    const importCode = Object.entries(importStatements)
        .map(([modulePath, components]) => `import { ${components.join(", ")} } from "${modulePath}";`)
        .join("\n");

    // find statements like useState, useEffect, useRef, etc
    const importHooks = reactCode.match(/import\s+{([^}]+)}\s+from\s+['"]react['"];/);

    // Return the final JSX component as a string
    return `

${importHooks ? importHooks[0] : ''}
${importCode}

${reactCode.replace(/import\s+({[^}]*})?\s+from\s+['"][^'"]+['"];\s*/g, '')}
`;
}


export const trimCode = (str: string): string => {
    const importIndex = str.indexOf('import');
    const lastBraceIndex = str.lastIndexOf('}');

    if (importIndex !==-1 && lastBraceIndex !== -1) {
        return str.slice(importIndex, lastBraceIndex + 1);
    }

    return str;
}