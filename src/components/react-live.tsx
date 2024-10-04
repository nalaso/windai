"use client";

import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

const ReactLiveContent = ({ react_code, theme, uiType }: { react_code: string, theme: string, uiType: string }) => {
    const [scope, setScope] = useState<Record<string, any> | null>(null);
    const [codeString, setCodeString] = useState<string>('');
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const loadScope = async () => {
            try {
                const components = await import('@/components/ui');

                const newScope: Record<string, any> = {
                    React,
                    HTMLElement,
                    HTMLDivElement,
                    HTMLInputElement,
                    HTMLButtonElement,
                    useState: React.useState,
                    useEffect: React.useEffect,
                    ...components
                };

                setScope(newScope);
            } catch (error) {
                console.error("Failed to load components:", error);
            }
        };

        loadScope();
    }, []);

    useEffect(() => {
        if (!scope || !react_code) return;   
        const cleanedCodeString = react_code
        .replace(/import\s+({[^}]*})?\s+from\s+['"][^'"]+['"];\s*/g, '') // Remove all import statements
        .replace(/import\s+({[^}]*})?\s+from\s+['"][^'"]+['"]\s*/g, '') // Remove all import statements
        .replace(/import\s+([\w*]+(,\s*{[^}]*})?)?\s+from\s+['"][^'"]+['"];\s*/g, '')
        .replace(/export default function \w+\s*\(\)\s*{/, '() => {') // Replace 'function FunctionName(' with '() => {'
        .trim(); // Remove leading or trailing newlines
        setCodeString(cleanedCodeString);        
    }, [scope, react_code]);

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

    if (!scope|| !codeString) {
        return (
            <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
        );
    }

    return (
        <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-background overflow-y-auto' : ''}`}>
            <div className={`${theme} relative bg-background`}>
                <LiveProvider code={codeString} scope={scope}>
                    <LiveError className="text-red-800 bg-red-100 mt-2 p-4"  />
                    <LivePreview />
                </LiveProvider>
            </div>
        </div>
    );
};

export default ReactLiveContent;