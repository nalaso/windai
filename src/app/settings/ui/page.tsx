"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label, Switch } from '@/components/ui';
import { ModeStore, useClientMode } from '@/hooks/useMode';
import { InfoIcon } from 'lucide-react';

export default function LLMSettingsPage() {
  const { preciseMode, balancedMode, creativeMode, setMode }:ModeStore = useClientMode();
  
  return (
    <div className="space-y-6">
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">UI Configuration</CardTitle>
          <CardDescription>Choose which modes to generate code.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="preciseMode" className="font-medium">Precise mode</Label>
              <p className="text-sm text-gray-500">Delivers highly accurate, detail-oriented results with minimal creativity.</p>
            </div>
            <Switch
              id="preciseMode"
              disabled
              checked={preciseMode}
              onCheckedChange={(val)=>setMode('preciseMode', val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="balancedMode" className="font-medium">Balanced mode</Label>
              <p className="text-sm text-gray-500">Blends accuracy and creativity for engaging, well-structured output.</p>
            </div>
            <Switch
              id="balancedMode"
              checked={balancedMode}
              onCheckedChange={(val)=>setMode('balancedMode', val)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="creativeMode" className="font-medium">Creative mode</Label>
              <p className="text-sm text-gray-500">Focuses on generating unique, imaginative, and innovative results.</p>
            </div>
            <Switch
              id="creativeMode"
              checked={creativeMode}
              onCheckedChange={(val)=>setMode('creativeMode', val)}
            /> 
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="creativeMode" className="font-medium">Windai mode</Label>
              <p className="text-sm text-gray-500">Optimized and fine-tuned to generate the most efficient and high-quality code</p>
            </div>
            <Switch
              id="creativeMode"
              disabled
              checked={false}
              onCheckedChange={(val)=>setMode('creativeMode', val)}
            /> 
          </div>
          <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-2 text-blue-800">
            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Windai mode coming soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}