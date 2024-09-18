"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge, Button } from '@/components/ui'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { themes as defaultThemes } from '@/lib/themes'
import { PlusCircle, Save } from 'lucide-react'

type ColorProperty = {
  name: string
  color: string
}

const initialProperties: ColorProperty[] = [
  { name: "Background", color: "#ffffff" },
  { name: "Foreground", color: "#0a0a0a" },
  { name: "Primary", color: "#1a1a1a" },
  { name: "Primary Foreground", color: "#fafafa" },
  { name: "Secondary", color: "#f4f4f5" },
  { name: "Secondary Foreground", color: "#1a1a1a" },
  { name: "Accent", color: "#f4f4f5" },
  { name: "Accent Foreground", color: "#1a1a1a" },
  { name: "Muted", color: "#f4f4f5" },
  { name: "Muted Foreground", color: "#737373" },
  { name: "Card", color: "#ffffff" },
  { name: "Card Foreground", color: "#0a0a0a" },
  { name: "Destructive", color: "#ef4444" },
  { name: "Destructive Foreground", color: "#fafafa" },
  { name: "Popover", color: "#ffffff" },
  { name: "Popover Foreground", color: "#0a0a0a" },
  { name: "Border", color: "#e5e5e5" },
  { name: "Input", color: "#e5e5e5" },
  { name: "Ring", color: "#1a1a1a" },
]

export default function ThemeCustomizer({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [properties, setProperties] = useState<ColorProperty[]>(initialProperties)
  const [heading, setHeading] = useState("Inter")
  const [body, setBody] = useState("Inter")
  const [radius, setRadius] = useState(0.5)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newVariableName, setNewVariableName] = useState("")

  useEffect(() => {
    const loadTheme = () => {
      const savedTheme = localStorage.getItem(`theme_${params.id}`)
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme)
        setProperties(parsedTheme.properties)
        setHeading(parsedTheme.heading)
        setBody(parsedTheme.body)
        setRadius(parsedTheme.radius)
      } else {
        const customThemes = JSON.parse(localStorage.getItem('customThemes') || '[]')
        const themeExists = [...defaultThemes, ...customThemes].some(theme => theme.id === params.id)
        
        if (!themeExists) {
          router.push('/themes')
        }
      }
    }

    loadTheme()
  }, [params.id, router])

  const handleColorChange = (name: string, color: string) => {
    setProperties(prevProperties =>
      prevProperties.map(prop =>
        prop.name === name ? { ...prop, color } : prop
      )
    )
  }

  const addNewVariable = () => {
    setIsDialogOpen(true)
  }

  const handleNewVariableSubmit = () => {
    if (newVariableName.trim() !== "") {
      setProperties([...properties, { name: newVariableName.trim(), color: "#000000" }])
      setNewVariableName("")
      setIsDialogOpen(false)
    }
  }

  const saveTheme = () => {
    const themeData = {
      properties,
      heading,
      body,
      radius
    }
    localStorage.setItem(`theme_${params.id}`, JSON.stringify(themeData))
    alert("Theme saved successfully!")
  }

  const ColorInput = ({ property }: { property: ColorProperty }) => (
    <div className="flex items-center space-x-2">
      <Input 
        className="!w-8 !h-8 !p-0 rounded-md border border-gray-300 cursor-pointer"
        type="color"
        value={property.color}
        onChange={(e) => handleColorChange(property.name, e.target.value)}
      />
      <Badge className='flex-grow text-center' variant="outline">{property.color}</Badge>
    </div>
  )

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-start items-center mb-6">
        <Button onClick={() => router.push("/")} variant="outline" className="text-xl font-bold p-1">WindAI</Button>
        <Button onClick={() => router.push("/themes")} variant="secondary" className="ml-2 text-xl font-bold p-1">Themes</Button>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-md">
        <CardHeader className="bg-primary text-white rounded-t-md">
          <CardTitle className="text-2xl">Theme Customizer (coming soon)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="heading" className="text-lg font-semibold">Heading Font</Label>
              <Select value={heading} onValueChange={setHeading}>
                <SelectTrigger id="heading" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="body" className="text-lg font-semibold">Body Font</Label>
              <Select value={body} onValueChange={setBody}>
                <SelectTrigger id="body" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Roboto">Roboto</SelectItem>
                  <SelectItem value="Open Sans">Open Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="radius" className="text-lg font-semibold">Border Radius (rem)</Label>
            <Input
              id="radius"
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              step={0.1}
              min={0}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div key={property.name} className="space-y-2">
                <Label className="font-medium">{property.name}</Label>
                <ColorInput property={property} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant={"secondary"} onClick={()=>addNewVariable()} className="flex items-center space-x-2">
                  <PlusCircle size={20} />
                  <span>Add Variable</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Variable</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="newVariableName" className="text-right">
                    Variable Name
                  </Label>
                  <Input
                    id="newVariableName"
                    value={newVariableName}
                    onChange={(e) => setNewVariableName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button onClick={handleNewVariableSubmit}>Add</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={()=>saveTheme()} variant={"default"} className="flex items-center space-x-2">
              <Save size={20} />
              <span>Save Theme</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}