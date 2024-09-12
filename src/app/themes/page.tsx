import React from 'react'
import { PlusCircle, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { themes } from '@/lib/themes'

export default function ThemeSelector() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Themes</h1>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Theme
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {theme.name}
              </CardTitle>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {theme.description}
              </p>
              <div className="flex mt-4 h-4">
              <div
                    className="flex-1"
                    style={{ backgroundColor: `hsl(${theme.colors.background})`}}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: `hsl(${theme.colors.foreground})`}}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: `hsl(${theme.colors.primary})`}}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: `hsl(${theme.colors.secondary})`}}
                  />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Custom Themes</h2>
        <Card className="p-6 text-center">
          {/* <h3 className="text-lg font-semibold mb-2">
            Custom themes are unavailable on your plan
          </h3> */}
          <p className="text-sm text-muted-foreground mb-4">
            Coming soon! 
          </p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Theme
          </Button>
        </Card>
      </div>
    </div>
  )
}