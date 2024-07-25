import { CodeXmlIcon } from "lucide-react";
import { Button } from "./ui/button";

const Header = (props: { openCode: () => void }) => {
    return (
      <div className="w-full h-20 bg-white flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Copilot Kit</h1>
        <div className="flex gap-x-2">
          <Button
            className="  px-6 py-1 rounded-md space-x-1"
            variant={"default"}
            onClick={props.openCode}
          >
            <span>Code</span> <CodeXmlIcon size={20} />
          </Button>
        </div>
      </div>
    );
  };

  export default Header;