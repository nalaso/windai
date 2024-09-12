import { Theme } from "./themes";

export const getCss = (theme: Theme): string => {
    const cssVariables = Object.entries(theme.colors)
      .map(([key, value]) => `--${key}: ${value};`)
      .join('\n  ');
  
    return `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  
    :root {
      ${cssVariables}
    }
  
    @layer base {
      * {
        @apply border-border;
      }
  
      body {
        @apply bg-background text-foreground font-body;
      }
  
      h1, h2, h3, h4, h5, h6 {
        @apply font-heading;
      }
    }
    `;
  }