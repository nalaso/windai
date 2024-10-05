"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { models } from '@/lib/modellist';
import { isModelSupported } from '@/lib/supportedllm';
import { useModel } from '@/hooks/useModel';
import { InfoIcon } from 'lucide-react';

interface Model {
  modelId: string;
  model: string;
}

export default function LLMSettingsPage() {
  const { initialModel, modifierModel, descriptiveModel, imageModel, setInitialModel, setModifierModel, setDescriptiveModel, setImageModel } = useModel();
  const [azureModels, setAzureModels] = useState<Model[]>([]);
  const [ollamaModels, setOllamaModels] = useState<Model[]>([]);
  const [newModel, setNewModel] = useState<Model>({ modelId: '', model: '' });
  const [modelType, setModelType] = useState<'azure' | 'ollama'>('azure');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedAzureModels = JSON.parse(localStorage.getItem('azureModels') || '[]') as Model[];
    const storedOllamaModels = JSON.parse(localStorage.getItem('ollamaModels') || '[]') as Model[];
    setAzureModels(storedAzureModels);
    setOllamaModels(storedOllamaModels);
  }, []);

  const addModel = () => {
    const updatedModels = modelType === 'azure' 
      ? [...azureModels, newModel] 
      : [...ollamaModels, newModel];
    
    if (modelType === 'azure') {
      setAzureModels(updatedModels);
      localStorage.setItem('azureModels', JSON.stringify(updatedModels));
    } else {
      setOllamaModels(updatedModels);
      localStorage.setItem('ollamaModels', JSON.stringify(updatedModels));
    }

    setNewModel({ modelId: '', model: '' });
    setIsDialogOpen(false);
  };

  const removeModel = (type: 'azure' | 'ollama', modelId: string) => {
    if (type === 'azure') {
      const updatedModels = azureModels.filter(model => model.modelId !== modelId);
      setAzureModels(updatedModels);
      localStorage.setItem('azureModels', JSON.stringify(updatedModels));
    } else if (type === 'ollama') {
      const updatedModels = ollamaModels.filter(model => model.modelId !== modelId);
      setOllamaModels(updatedModels);
      localStorage.setItem('ollamaModels', JSON.stringify(updatedModels));
    }
  };

  const allModels = {
    ...models,
    azure: [...models.azure, ...azureModels],
    ollama: [...models.ollama, ...ollamaModels],
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-xl font-semibold">Model Selection</CardTitle>
          <CardDescription>Choose your preferred LLM models for different tasks.</CardDescription>
          <div className="bg-yellow-50 p-2 rounded-md flex items-start space-x-2 text-yellow-800">
              <InfoIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                anthropicVertex:claude-3-5-sonnet@20240620 is not available. Please select another model. gemini-1.5-pro-002, Meta-Llama-3.1-405B-Instruct are recommended.
              </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-5">
          <div>
            <h3 className="text-lg font-semibold mb-2">Initial Model</h3>
            <p className="text-sm text-gray-600 mb-2">Used in the initial state. This model generates the basic struture of the UI.</p>
            <Select value={initialModel} onValueChange={setInitialModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select initial model" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allModels).map(([provider, modelList]) => (
                  <SelectGroup key={provider}>
                    <SelectLabel>{provider.charAt(0).toUpperCase() + provider.slice(1)}</SelectLabel>
                    {modelList.map((model) => (
                      <SelectItem 
                        key={model.modelId} 
                        value={model.modelId}
                        disabled={!isModelSupported(model.modelId)}
                      >
                        {model.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Image Model</h3>
            <p className="text-sm text-gray-600 mb-2">Used in screenshot to code generation. This model generates the identifies elements property from the image.</p>
            <Select value={imageModel} onValueChange={setImageModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select initial model" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allModels).map(([provider, modelList]) => (
                  <SelectGroup key={provider}>
                    <SelectLabel>{provider.charAt(0).toUpperCase() + provider.slice(1)}</SelectLabel>
                    {modelList.map((model) => (
                      <SelectItem 
                        key={model.modelId} 
                        value={model.modelId}
                        disabled={!isModelSupported(model.modelId)}
                      >
                        {model.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Modifier Model</h3>
            <p className="text-sm text-gray-600 mb-2">Used to modify and refine the content based on subprompts.</p>
            <Select value={modifierModel} onValueChange={setModifierModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select modifier model" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allModels).map(([provider, modelList]) => (
                  <SelectGroup key={provider}>
                    <SelectLabel>{provider.charAt(0).toUpperCase() + provider.slice(1)}</SelectLabel>
                    {modelList.map((model) => (
                      <SelectItem 
                        key={model.modelId} 
                        value={model.modelId}
                        disabled={!isModelSupported(model.modelId)}
                      >
                        {model.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Descriptive Model</h3>
            <p className="text-sm text-gray-600 mb-2">Used for generating detailed component descriptions.</p>
            <Select value={descriptiveModel} onValueChange={setDescriptiveModel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select descriptive model" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(allModels).map(([provider, modelList]) => (
                  <SelectGroup key={provider}>
                    <SelectLabel>{provider.charAt(0).toUpperCase() + provider.slice(1)}</SelectLabel>
                    {modelList.map((model) => (
                      <SelectItem 
                        key={model.modelId} 
                        value={model.modelId}
                        disabled={!isModelSupported(model.modelId)}
                      >
                        {model.model}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Custom Models</CardTitle>
          <CardDescription>Manage your custom Azure and Ollama models</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Model</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Model</DialogTitle>
                <DialogDescription>Enter the details for your new custom model.</DialogDescription>
              </DialogHeader>
              <Select value={modelType} onValueChange={(value: 'azure' | 'ollama') => setModelType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="azure">Azure</SelectItem>
                  <SelectItem value="ollama">Ollama</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder={modelType==="azure"?"Deployment name":"Model Name"}
                value={newModel.model}
                onChange={(e) => setNewModel({ 
                  modelId: `${modelType}:${e.target.value}`, 
                  model: e.target.value 
                })}
              />
              <DialogFooter>
                <Button onClick={addModel}>Add Model</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <div className="mt-4">
            {azureModels.length > 0 && (
              <h4 className="font-semibold">Custom Azure Models:</h4>
            )}
            <ul className="list-disc pl-5">
              {azureModels.map((model, index) => (
                <li key={index} className="flex items-center justify-between border-b py-2">
                  <span>{model.model} ({model.modelId})</span>
                  <Button variant="destructive" size="sm" onClick={() => removeModel('azure', model.modelId)}>Remove</Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            {ollamaModels.length > 0 && (
              <h4 className="font-semibold">Custom Ollama Models:</h4>
            )}
            <ul className="list-disc pl-5">
              {ollamaModels.map((model, index) => (
                <li key={index} className="flex items-center justify-between border-b py-2">
                  <span>{model.model} ({model.modelId})</span>
                  <Button variant="destructive" size="sm" onClick={() => removeModel('ollama', model.modelId)}>Remove</Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}