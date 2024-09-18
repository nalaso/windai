import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitFork } from 'lucide-react';

interface ForkThemeDialogProps {
  theme: {
    id: string;
    name: string;
  };
  onThemeFork: (themeId: string, themeName: string, themeDescription: string) => void;
}

export function ForkThemeDialog({ theme, onThemeFork }: ForkThemeDialogProps) {
  const [themeId, setThemeId] = useState(`${theme.id}-fork-${Date.now()}`);
  const [themeName, setThemeName] = useState(`${theme.name} (Fork)`);
  const [themeDescription, setThemeDescription] = useState(`Forked from ${theme.name}`);
  const [open, setOpen] = useState(false);

  const handleFork = () => {
    onThemeFork(themeId, themeName, themeDescription);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <GitFork className="mr-2 h-4 w-4" />
          Fork
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Fork Theme</DialogTitle>
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
        <Button onClick={handleFork}>Fork Theme</Button>
      </DialogContent>
    </Dialog>
  );
}