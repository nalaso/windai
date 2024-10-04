"use client";
import { useEffect, useState } from 'react';
import { create } from "zustand";

export interface ModeStore {
    preciseMode: boolean;
    balancedMode: boolean;
    creativeMode: boolean;
    setMode: (mode: string, value: boolean) => void;
}

export const useMode = create<ModeStore>((set) => ({
    preciseMode: true,
    balancedMode: true,
    creativeMode: false,
    setMode: (mode: string, value: boolean) => set(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(mode, value.toString());
        }
        return { [mode]: value };
    }),
}));

export const useClientMode = () => {
    const { preciseMode, balancedMode, creativeMode, setMode } = useMode();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        const precise = localStorage.getItem('preciseMode') === 'true' || localStorage.getItem('preciseMode') === null;
        const balanced = localStorage.getItem('balancedMode') === 'true' || localStorage.getItem('balancedMode') === null;
        const creative = localStorage.getItem('creativeMode') === 'true';
                
        setMode('preciseMode', precise);
        setMode('balancedMode', balanced);
        setMode('creativeMode', creative);
    }, []);

    if (!hydrated) {
        return { preciseMode: true, balancedMode: true, creativeMode: false, setMode }; // Default values
    }

    return { preciseMode, balancedMode, creativeMode, setMode };
};