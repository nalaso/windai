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


export const generateCSSConfig = () => {
    return `
    .bg-border {
        background-color: hsl(var(--border));
      }
  
      .bg-input {
        background-color: hsl(var(--input));
      }
  
      .bg-ring {
        background-color: hsl(var(--ring));
      }
  
      .bg-background {
        background-color: hsl(var(--background));
      }
  
      .text-foreground {
        color: hsl(var(--foreground));
      }
  
      /* Primary */
      .bg-primary {
        background-color: hsl(var(--primary));
      }
  
      .text-primary {
        color: hsl(var(--primary));
      }
  
      .text-primary-foreground {
        color: hsl(var(--primary-foreground));
      }
  
      /* Secondary */
      .bg-secondary {
        background-color: hsl(var(--secondary));
      }
  
      .text-secondary {
        color: hsl(var(--secondary));
      }
  
      .text-secondary-foreground {
        color: hsl(var(--secondary-foreground));
      }
  
      /* Destructive */
      .bg-destructive {
        background-color: hsl(var(--destructive));
      }
  
      .text-destructive {
        color: hsl(var(--destructive));
      }
  
      .text-destructive-foreground {
        color: hsl(var(--destructive-foreground));
      }
  
      /* Muted */
      .bg-muted {
        background-color: hsl(var(--muted));
      }
  
      .text-muted {
        color: hsl(var(--muted));
      }
  
      .text-muted-foreground {
        color: hsl(var(--muted-foreground));
      }
  
      /* Accent */
      .bg-accent {
        background-color: hsl(var(--accent));
      }
  
      .text-accent {
        color: hsl(var(--accent));
      }
  
      .text-accent-foreground {
        color: hsl(var(--accent-foreground));
      }
  
      /* Popover */
      .bg-popover {
        background-color: hsl(var(--popover));
      }
  
      .text-popover {
        color: hsl(var(--popover));
      }
  
      .text-popover-foreground {
        color: hsl(var(--popover-foreground));
      }
  
      /* Card */
      .bg-card {
        background-color: hsl(var(--card));
      }
  
      .text-card {
        color: hsl(var(--card));
      }
  
      .text-card-foreground {
        color: hsl(var(--card-foreground));
      }
  
      /* Border radius */
      .rounded-lg {
        border-radius: var(--radius);
      }
  
      .rounded-md {
        border-radius: calc(var(--radius) - 2px);
      }
  
      .rounded-sm {
        border-radius: calc(var(--radius) - 4px);
      }
    `;
}  