import { ReactNode } from "react";

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[12%] min-h-full bg-white rounded-md p-4">
      <h1 className="text-sm mb-2">History</h1>
      {children}
    </div>
  );
};

export default Sidebar;
