"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { InfoIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export default function GeneralSettingsPage() {
  const [enabled, setEnabled] = useState(true)
  const [developerMode, setDeveloperMode] = useState(false)
  const [experimentalFeatures, setExperimentalFeatures] = useState(false)
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">General Settings</CardTitle>
          <CardDescription>description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="flex justify-between items-center">
            <Label htmlFor="preview-deployments" className="font-medium">Default visibility</Label>
            <Select defaultValue="public">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Default (public)</SelectItem>
                <SelectItem value="private">private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-2 text-blue-800">
            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Under development. This setting will be used as the default visibility for new ui generation.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="production-deployments" className="font-medium">Image preview quality</Label>
            <Select defaultValue="low">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Default (low)</SelectItem>
                <SelectItem value="high">high</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-blue-50 p-4 rounded-md flex items-start space-x-2 text-blue-800">
            <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Under development. This setting will be used as the default quality for image previews. High quality previews may take longer to generate and sometime makes the tab unresponsive.
            </p>
          </div>
          {/* <div className="flex items-center justify-between">
            <Label htmlFor="override" className="font-medium">Demo</Label>
            <Switch
              id="override"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div> */}
        </CardContent>
        {/* <CardFooter className="flex justify-between items-center border-t border-gray-200 pt-6">
          <Button variant="outline" className="text-blue-600">
            Learn more
          </Button>
          <Button>Save</Button>
        </CardFooter> */}
      </Card>

      {/* <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">Transfer</CardTitle>
          <CardDescription>Transfer your projects to another team without downtime or workflow interruptions.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" className="text-blue-600">
              Learn more about Transferring Projects
            </Button>
            <Button>Transfer</Button>
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">Leave Team</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Button variant="destructive">Leave Team</Button>
        </CardContent>
      </Card> */}

      <Card className="border border-gray-200">
        <CardHeader 
          className="border-b border-gray-200 cursor-pointer"
          onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
        >
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Advanced Settings (coming soon)</CardTitle>
            {advancedSettingsOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
          <CardDescription>Configure advanced options for your account.</CardDescription>
        </CardHeader>
        {advancedSettingsOpen && (
          <CardContent className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="developer-mode" className="font-medium">Developer Mode</Label>
                <p className="text-sm text-gray-500">Enable additional developer features and logs.</p>
              </div>
              <Switch
                id="developer-mode"
                checked={developerMode}
                onCheckedChange={setDeveloperMode}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="experimental-features" className="font-medium">Experimental Features</Label>
                <p className="text-sm text-gray-500">Try out new experimental features before they&apos;re released.</p>
              </div>
              <Switch
                id="experimental-features"
                checked={experimentalFeatures}
                onCheckedChange={setExperimentalFeatures}
              />
            </div>
          </CardContent>
        )}
        <CardFooter className="flex justify-end items-center border-t border-gray-200 pt-6">
          <Button>Save Advanced Settings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}