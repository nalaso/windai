"use client";

import { ApiKeyInput } from '@/components/api-key-input';
import { useState } from 'react';

const ApiKeyPage = () => {
  const [apiKey, setApiKey] = useState('');

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey);
    // Store the API key in local storage or environment variables
    localStorage.setItem('apiKey', newApiKey);
  };

  return (
    <div>
      <h1>Coming soon</h1>
      {/* <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
      <p>Your current API key is: {apiKey}</p> */}
    </div>
  );
};

export default ApiKeyPage;
