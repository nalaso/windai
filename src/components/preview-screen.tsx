import * as UI from '@/components/ui';
import JsxParser from 'react-jsx-parser'
import React, { ComponentType, ExoticComponent, useEffect, useRef } from 'react';
import useTheme from '@/hooks/useTheme';
import { createRoot } from 'react-dom/client';
import { themes } from '../lib/themes';
import { getCss } from '@/lib/globalCss';

type JsxParserComponents = Record<string, ComponentType<any> | ExoticComponent<any>>;

function castComponents(components: typeof UI): JsxParserComponents {
  return components as unknown as JsxParserComponents;
}

const ParsedContent = ({ html_code, theme }: { html_code: string; theme: string }) => {
  return (
    <div className={`${theme} relative`}>
      <JsxParser
        components={castComponents(UI)}
        jsx={html_code}
      />
    </div>
  );
};

function generateCSSConfig() {
  var config = `
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

  return config;
}

const PreviewScreen = ({ html_code }: { html_code: string }) => {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        // if (!isInitializedRef.current) {
          // Initialize iframe head only once
          iframeDocument.head.innerHTML = '';

          // Add Tailwind CSS from CDN
          const linkElement = iframeDocument.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
          iframeDocument.head.appendChild(linkElement);
          
          // Add generated CSS
          const styleElement = iframeDocument.createElement('style');
          styleElement.textContent = getCss(themes.find(t => t.id === theme)!);
          iframeDocument.head.appendChild(styleElement);
          
          // Add Tailwind configuration script
          const configStyle = iframeDocument.createElement('style');
          configStyle.textContent = generateCSSConfig();
          iframeDocument.head.appendChild(configStyle);
          
          // Add Ionicons scripts
          const scriptEsm = iframeDocument.createElement('script');
          scriptEsm.type = 'module';
          scriptEsm.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
          iframeDocument.head.appendChild(scriptEsm);

          const scriptNoModule = iframeDocument.createElement('script');
          scriptNoModule.noModule = true;
          scriptNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
          iframeDocument.head.appendChild(scriptNoModule);

          isInitializedRef.current = true;
        // }

        // Update body content
        iframeDocument.body.innerHTML = '';
        const container = iframeDocument.createElement('div');
        iframeDocument.body.appendChild(container);

        const root = createRoot(container);
        root.render(<ParsedContent html_code={html_code} theme={theme} />);
      }
    }
  }, [html_code, theme]);

  //TODO: Fix iframe theme and use it
  return (
    <>
        {/* <iframe ref={iframeRef} style={{ width: '100%', height: '100%', border: 'none' }} /> */}
        <ParsedContent html_code={html_code} theme={theme} />
      </>
  );
};

export default PreviewScreen;
