import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };

  return (
    // <Input
    //   type="password"
    //   placeholder="Enter your API key"
    //   value={apiKey}
    //   onChange={handleChange}
    // />
    <p>Coming soon</p>
  );
};
