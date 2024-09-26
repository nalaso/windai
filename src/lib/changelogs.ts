export type ChangeType = 'feature' | 'improvement' | 'bugfix' | 'other'

export interface Change {
    type: ChangeType
    description: string
}

export interface Version {
    date: string
    changes: Change[]
}

export const commitChanges: Version[] = [
    {
        date: "2024-09-26",
        changes: [
            { type: "feature", description: "Generation page in menu" },
            { type: "feature", description: "Mode (balanced, creative) selection in settings" },
            { type: "feature", description: "user generation link in every ui card" },
            { type: "bugfix", description: "Fixed 'unable to generate code' issue'" },
        ],
    },
    {
        date: "2024-09-25",
        changes: [
            { type: "feature", description: "Implemented full screen functionality (ctrl/cmd + k)" },
            { type: "other", description: "Added Google 002 models" },
        ],
    },
    {
        date: "2024-09-24",
        changes: [
            { type: "feature", description: "Integrated OpenRouter" },
            { type: "improvement", description: "Updated useModel hook" },
            { type: "other", description: "Set default model to Gemini" },
            { type: "other", description: "Updated OpenRouter environment format" },
            { type: "other", description: "Added Vertex models" },
            { type: "other", description: "Added Anthropic Vertex" },
        ],
    },
    {
        date: "2024-09-23",
        changes: [
            { type: "feature", description: "Added new models - Mistral, Codestral, GitHub models" },
            { type: "improvement", description: "Refactored supportedllm.ts to remove Codestral from supported models" },
            { type: "improvement", description: "Updated UI" },
            { type: "bugfix", description: "Fixed fork-ui new schema" },
            { type: "other", description: "Added lock to disabled state" },
        ],
    },
    {
        date: "2024-09-22",
        changes: [
            { type: "other", description: "Created LICENSE file" },
            { type: "other", description: "Added README" },
        ],
    },
    {
        date: "2024-09-19",
        changes: [
            { type: "feature", description: "Added image generation capability" },
            { type: "improvement", description: "Refactored codebase" },
            { type: "bugfix", description: "Fixed 'any LLM' issue" },
            { type: "bugfix", description: "Fixed descriptiveModel" },
            { type: "bugfix", description: "Resolved localStorage not defined error" },
            { type: "bugfix", description: "Fixed apostrophe rendering" },
        ],
    },
    {
        date: "2024-09-18",
        changes: [
            { type: "feature", description: "Introduced new models" },
            { type: "feature", description: "Implemented custom theme functionality" },
            { type: "improvement", description: "Refactored links in settings and about pages" },
            { type: "improvement", description: "Refactored settings page and about page" },
            { type: "improvement", description: "Added settings sidebar" },
            { type: "improvement", description: "Enhanced settings page" },
            { type: "bugfix", description: "Fixed localStorage not defined error" },
            { type: "bugfix", description: "Fixed apostrophe rendering in themes page" },
            { type: "bugfix", description: "Fixed apostrophe rendering in general page" },
            { type: "other", description: "Commented out error in layout" },
        ],
    },
    {
        date: "2024-09-17",
        changes: [
            { type: "feature", description: "Added iframe beta" },
            { type: "feature", description: "Integrated Google Analytics" },
            { type: "improvement", description: "Enhanced prompts" },
            { type: "improvement", description: "Implemented Anthropic provider registry" },
        ],
    },
    {
        date: "2024-09-12",
        changes: [
            { type: "feature", description: "Implemented bug report UI" },
            { type: "feature", description: "Added code copy functionality" },
            { type: "feature", description: "Implemented themes" },
            { type: "improvement", description: "Refactored CSS class names to use lowercase letters" },
        ],
    },
    {
        date: "2024-09-07",
        changes: [
            { type: "feature", description: "Integrated Vercel Analytics" },
            { type: "bugfix", description: "Improved error handling when creating UI" },
            { type: "bugfix", description: "Fixed view-increment API route and generative suggestions" },
            { type: "other", description: "Increased number of UIs fetched in getUIHome to 11" },
            { type: "other", description: "Updated layout.tsx with favicon and script imports" },
            { type: "other", description: "Updated CardDescription text in maintenance page" },
            { type: "other", description: "Implemented maintenance mode" },
            { type: "other", description: "Removed console.log statements" },
        ],
    },
    {
        date: "2024-09-06",
        changes: [
            { type: "bugfix", description: "Fixed regenerate authorization, responsive lock, and UI image issues" },
        ],
    },
    {
        date: "2024-09-05",
        changes: [
            { type: "feature", description: "Added colored version buttons" },
        ],
    },
    {
        date: "2024-09-04",
        changes: [
            { type: "feature", description: "Implemented fork v1 functionality" },
            { type: "feature", description: "Migrated authentication from Clerk to AuthJS" },
            { type: "feature", description: "Added time range filter to explore page" },
            { type: "feature", description: "Implemented forkedFrom label" },
            { type: "bugfix", description: "Fixed fork v2 reusable code documentation" },
            { type: "other", description: "Updated favicon link in layout.tsx" },
            { type: "other", description: "Updated ImageResponse import in icon.tsx" },
            { type: "other", description: "Updated branding to WindAI in UI components" },
            { type: "other", description: "Fixed layout overflow" },
            { type: "other", description: "Removed @babel/standalone dependency from package.json" },
        ],
    },
    {
        date: "2024-09-03",
        changes: [
            { type: "feature", description: "Added tooltip to display prompt details in UIHeader and UIRightHeader components" },
            { type: "feature", description: "Implemented controlled resize functionality" },
            { type: "feature", description: "Added ability to regenerate modified code" },
            { type: "feature", description: "Implemented UI ID sharing functionality" },
            { type: "improvement", description: "Refactored error handling in UI component" },
            { type: "bugfix", description: "Fixed code to use shared constants for maxDuration and dynamic values" },
            { type: "other", description: "Added Zod validation" },
            { type: "other", description: "Changed CodeViewer component" },
            { type: "other", description: "Changed maxDuration to 60, implemented global Anthropic reference" },
        ],
    },
];