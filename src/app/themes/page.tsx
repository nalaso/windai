"use client"
import React, { useState, useEffect } from 'react'
import { MoreVertical, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { themes, Theme } from '@/lib/themes'
import { useRouter } from 'next/navigation'
import { NewThemeDialog } from '@/components/new-theme-dialog'
import { ForkThemeDialog } from '@/components/fork-theme-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'
import { Badge } from '@/components/ui'

export default function ThemeSelector() {
  const router = useRouter()
  const [customThemes, setCustomThemes] = useState<Theme[]>([])

  useEffect(() => {
    const storedThemes = localStorage.getItem('customThemes')
    if (storedThemes) {
      setCustomThemes(JSON.parse(storedThemes))
    }
  }, [])

  const handleThemeCreate = (themeId: string, themeName: string, description: string) => {
    const newTheme: Theme = {
      id: themeId,
      name: themeName,
      description: description,
      colors: {
        background: "0 0% 100%",
        foreground: "240 10% 3.9%",
        card: "0 0% 100%",
        cardForeground: "240 10% 3.9%",
        popover: "0 0% 100%",
        popoverForeground: "240 10% 3.9%",
        primary: "240 5.9% 10%",
        primaryForeground: "0 0% 98%",
        secondary: "240 4.8% 95.9%",
        secondaryForeground: "240 5.9% 10%",
        muted: "240 4.8% 95.9%",
        mutedForeground: "240 3.8% 46.1%",
        accent: "240 4.8% 95.9%",
        accentForeground: "240 5.9% 10%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
        border: "240 5.9% 90%",
        input: "240 5.9% 90%",
        ring: "240 10% 3.9%",
        radius: "0.5rem"
      },
    }
    const updatedThemes = [...customThemes, newTheme]
    setCustomThemes(updatedThemes)
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes))
    router.push(`/themes/${themeId}`)
  }

  const handleThemeDelete = (themeId: string,e :any) => {
    e.stopPropagation();
    const updatedThemes = customThemes.filter(theme => theme.id !== themeId)
    setCustomThemes(updatedThemes)
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes))
    toast.success('Theme deleted successfully')
  }

  const handleThemeFork = (originalTheme: Theme, newId: string, newName: string, newDescription: string) => {
    const forkedTheme: Theme = {
      ...originalTheme,
      id: newId,
      name: newName,
      description: newDescription,
    }
    const updatedThemes = [...customThemes, forkedTheme]
    setCustomThemes(updatedThemes)
    localStorage.setItem('customThemes', JSON.stringify(updatedThemes))
    toast.success('Theme forked successfully')
    router.push(`/themes/${newId}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => router.push("/")} variant={"outline"} className="text-xl font-bold p-1">WindAI</Button>
        <h1 className="text-3xl font-bold">Themes</h1>
        <NewThemeDialog onThemeCreate={handleThemeCreate} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {theme.name}
                <Badge variant="secondary" className="ml-2">{theme.id}</Badge>
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <ForkThemeDialog
                    theme={theme}
                    onThemeFork={(newId, newName, newDescription) => handleThemeFork(theme, newId, newName, newDescription)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {theme.description}
              </p>
              <div className="flex mt-4 h-4">
                <div
                  className="flex-1"
                  style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                />
                <div
                  className="flex-1"
                  style={{ backgroundColor: `hsl(${theme.colors.foreground})` }}
                />
                <div
                  className="flex-1"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                />
                <div
                  className="flex-1"
                  style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Custom Themes (coming soon)</h2>
        {customThemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customThemes.map((theme) => (
              <Card key={theme.id} onClick={()=>router.push(`themes/${theme.id}`)} className="overflow-hidden cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {theme.name}
                    <Badge variant="secondary" className="ml-2">{theme.id}</Badge>
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <ForkThemeDialog
                        theme={theme}
                        onThemeFork={(newId, newName, newDescription) => handleThemeFork(theme, newId, newName, newDescription)}
                      />
                      <DropdownMenuItem onClick={(e) => handleThemeDelete(theme.id,e)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {theme.description}
                  </p>
                  <div className="flex mt-4 h-4">
                    <div
                      className="flex-1"
                      style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: `hsl(${theme.colors.foreground})` }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                    />
                    <div
                      className="flex-1"
                      style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              You haven&apos;t created any custom theme yet.
            </p>
            <NewThemeDialog onThemeCreate={handleThemeCreate} />
          </Card>
        )}
      </div>
    </div>
  )
}