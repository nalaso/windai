"use client"
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui'

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

export default function ThemeCustomizer() {
  const [properties, setProperties] = useState<ColorProperty[]>(initialProperties)
  const [heading, setHeading] = useState("Inter")
  const [body, setBody] = useState("Inter")
  const [radius, setRadius] = useState(0.5)

  const handleColorChange = (name: string, color: string) => {
    setProperties(prevProperties =>
      prevProperties.map(prop =>
        prop.name === name ? { ...prop, color } : prop
      )
    )
  }

  const ColorInput = ({ property }: { property: ColorProperty }) => (
    <div className="flex items-center space-x-2">
      <Input className="!w-6 !h-6 !p-0 rounded-sm border border-gray-300"
              type="color"
              value={property.color}
              onChange={(e) => handleColorChange(property.name, e.target.value)}
            />
            <Badge className='w-[180px]' variant={"outline"}>{property.color}</Badge>
    </div>
  )

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="heading">Heading</Label>
            <Select value={heading} onValueChange={setHeading}>
              <SelectTrigger id="heading">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                {/* Add more font options */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="body">Body</Label>
            <Select value={body} onValueChange={setBody}>
              <SelectTrigger id="body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                {/* Add more font options */}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="radius">Radius (rem)</Label>
          <Input
            id="radius"
            type="number"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            step={0.1}
            min={0}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {properties.map((property, index) => (
            <div key={property.name} className="flex flex-col">
              <Label className="mb-1">{property.name}</Label>
            <ColorInput property={property} />
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  )
}