import * as UI from '@/components/ui';
import JsxParser from 'react-jsx-parser'

const PreviewScreen = ({ html_code }: { html_code: string }) => {

  return (
    <div className="w-full h-full bg-white rounded-lg  shadow-lg p-2 border">
      <JsxParser
        components={{ ...UI }}
        jsx={html_code}
      />
    </div>
  );
};
export default PreviewScreen; 
