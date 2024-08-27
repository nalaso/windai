import * as UI from '@/components/ui';
import JsxParser from 'react-jsx-parser'
import React, { ComponentType, ExoticComponent } from 'react';

type JsxParserComponents = Record<string, ComponentType<any> | ExoticComponent<any>>;

function castComponents(components: typeof UI): JsxParserComponents {
  return components as unknown as JsxParserComponents;
}

const PreviewScreen = ({ html_code }: { html_code: string }) => {
  return (
    <div className='relative'>
      <JsxParser
        components={castComponents(UI)}
        jsx={html_code}
      />
    </div>
  );
};

export default PreviewScreen; 
