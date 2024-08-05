import * as UI from '@/components/ui';
import JsxParser from 'react-jsx-parser'

const PreviewScreen = ({ html_code }: { html_code: string }) => {

  return (
    // <div className="w-full h-full bg-white rounded-lg  shadow-lg p-2 border">
    <div className='relative'>

      <JsxParser
        components={{ ...UI }}
        jsx={html_code}
        />
        <style>
        @import url(&#x27;https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css&#x27;);
      </style>
        </div>
    // </div>
  );
};
export default PreviewScreen; 
