import dynamic from 'next/dynamic';
import React from 'react';

const DynamicLLMSettingsPage = dynamic(() => import('./LLMSettingsPage'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function LLMSettingsPageWrapper() {
  return <DynamicLLMSettingsPage />;
}