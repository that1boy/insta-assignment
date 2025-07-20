import React, { useState } from "react";
import { StoryViewer } from "../components/StoryViewer";
import { StoryBar } from "../components/StoryBar";

export const HomePage: React.FC = () => {

const [activeUserId, setActiveUserId] = useState<string| null>(null);

const handleOnSelect = (userId: string) => {
  setActiveUserId(userId);
}

  return (
    <>
      <div className="fixed min-h-screen w-screen bg-black text-white md:hidden overflow-hidden">
        <StoryBar onSelect={handleOnSelect}/>
        {activeUserId && (
          <StoryViewer 
          activeUserId={activeUserId}
          onClose={() => setActiveUserId(null)}
           />
        )}
      </div>
      <div className="hidden md:flex w-screen h-screen items-center justify-center bg-black text-gray-100 text-2xl">
        This app is only available on mobile devices📱.
      </div>
    </>
  );
};
