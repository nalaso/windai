import * as UI from '@/components/ui';
import JsxParser from 'react-jsx-parser'
import React, { ComponentType, ExoticComponent, useEffect, useRef, useState } from 'react';
import useTheme from '@/hooks/useTheme';
import { createRoot } from 'react-dom/client';
import { themes } from '../lib/themes';
import { generateCSSConfig, getCss } from '@/lib/globalCss';
import * as NextComponents from '@/lib/nextui-components';
import { NextUIProvider } from '@nextui-org/system';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ReactLiveContent from './react-live';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  router: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Caught an error:", error, errorInfo);
    toast.error("Error occurred while parsing content. Try using different model")
    toast.warning("Error occurred while parsing content. Try using different model", {
      action: {
        label: 'Change llm',
        onClick: () => this.props.router.push('/settings/llm')
      },
    })
  }

  render() {
    if (this.state.hasError) {
      return <div className="bg-black text-white p-4">Error occurred while parsing content. Try using different model </div>;
    }

    return this.props.children;
  }
}


type JsxParserComponents = Record<string, ComponentType<any> | ExoticComponent<any>>;

function castComponents(components: typeof UI | typeof NextComponents): JsxParserComponents {
  return components as unknown as JsxParserComponents;
}

const ParsedContent = ({ html_code, theme, uiType }: { html_code: string, theme: string, uiType: string }) => {
  const [parsedJsx, setParsedJsx] = useState<React.ReactNode>(null);
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsFullScreen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    try {
      setParsedJsx(
        <JsxParser
          components={uiType === "shadcn-react" ? castComponents(UI) : castComponents(NextComponents)}
          jsx={html_code}
          onError={(e) => {
            console.error("Error in JsxParser:", e)            
            setRenderError(e)
          }}
        />
      );
    } catch (err) {
      console.error("Error in ParsedContent:", err);
    }
    return () => {
      setParsedJsx(null);
      setRenderError(null);
    }
  }, [html_code, uiType]);

  return (
    <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-background overflow-y-auto' : ''}`}>
      <div className={`${theme} relative bg-background`}>
        <ErrorBoundary router={router}>
          {
            renderError ? (
              <div className="bg-black text-white p-4">Error occurred while rendering content. Try using different model </div>
            ) : parsedJsx
          }
        </ErrorBoundary>
      </div>
    </div>
  );
};

const PreviewScreen = ({ html_code, uiType }: { html_code: string, uiType: string }) => {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInitializedRef = useRef(false);

  // useEffect(() => {
  //   if (iframeRef.current) {
  //     const iframeDocument = iframeRef.current.contentDocument;
  //     if (iframeDocument) {
  //       // if (!isInitializedRef.current) {
  //         // Initialize iframe head only once
  //         iframeDocument.head.innerHTML = '';

  //         // Add Tailwind CSS from CDN
  //         const linkElement = iframeDocument.createElement('link');
  //         linkElement.rel = 'stylesheet';
  //         linkElement.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
  //         iframeDocument.head.appendChild(linkElement);

  //         // Add generated CSS
  //         const styleElement = iframeDocument.createElement('style');
  //         styleElement.textContent = getCss(themes.find(t => t.id === theme)!);
  //         iframeDocument.head.appendChild(styleElement);

  //         // Add Tailwind configuration script
  //         const configStyle = iframeDocument.createElement('style');
  //         configStyle.textContent = generateCSSConfig();
  //         iframeDocument.head.appendChild(configStyle);

  //         // Add Ionicons scripts
  //         const scriptEsm = iframeDocument.createElement('script');
  //         scriptEsm.type = 'module';
  //         scriptEsm.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
  //         iframeDocument.head.appendChild(scriptEsm);

  //         const scriptNoModule = iframeDocument.createElement('script');
  //         scriptNoModule.noModule = true;
  //         scriptNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
  //         iframeDocument.head.appendChild(scriptNoModule);

  //         isInitializedRef.current = true;
  //       // }

  //       // Update body content
  //       iframeDocument.body.innerHTML = '';
  //       const container = iframeDocument.createElement('div');
  //       iframeDocument.body.appendChild(container);

  //       const root = createRoot(container);
  //       root.render(<ParsedContent html_code={html_code} theme={theme} />);
  //     }
  //   }
  // }, [html_code, theme]);

  //TODO: Fix iframe theme and use it
  return (
    <NextUIProvider>
      {/* <iframe ref={iframeRef} style={{ width: '100%', height: '100%', border: 'none' }} /> */}
      {/* <ParsedContent html_code={html_code} theme={theme} uiType={uiType} /> */}
      <ReactLiveContent react_code={html_code} theme={theme} uiType={uiType} />
    </NextUIProvider>
  );
};

export default PreviewScreen;
