"use client"
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from 'lucide-react';
import { themes as defaultThemes } from '@/lib/themes';
import { toast } from 'sonner';

interface NewThemeDialogProps {
  onThemeCreate: (themeId: string, themeName: string, description: string) => void;
}

export function NewThemeDialog({ onThemeCreate }: NewThemeDialogProps) {
  const [themeId, setThemeId] = useState('');
  const [themeName, setThemeName] = useState('');
  const [themeDescription, setThemeDescription] = useState("Custom theme")
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if(!themeId || !themeName) {
        toast.error('Please enter a Theme ID and Theme Name.');
        return;
    }
    const customThemes = JSON.parse(localStorage.getItem('customThemes') || '[]');
    const themeExists = [...defaultThemes, ...customThemes].some(theme => theme.id.toLowerCase() === themeId.toLowerCase());

    if (themeExists) {
      toast.error('Theme ID already exists. Please choose a different ID.');
      return;
    }

    onThemeCreate(themeId, themeName, themeDescription);
    setThemeId('');
    setThemeName('');
    setOpen(false);
    toast.success('New theme created successfully!');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Theme
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Theme</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="themeId" className="text-right">
              Theme ID
            </Label>
            <Input
              id="themeId"
              value={themeId}
              onChange={(e) => setThemeId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="themeName" className="text-right">
              Theme Name
            </Label>
            <Input
              id="themeName"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="themeDescription" className="text-right">
              Description
            </Label>
            <Input
              id="themeDescription"
              value={themeDescription}
              onChange={(e) => setThemeDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleCreate}>Create Theme</Button>
      </DialogContent>
    </Dialog>
  );
}