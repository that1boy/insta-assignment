import React from "react";
import { StoryViewer } from "../components/StoryViewer";
import { StoryBar } from "../components/StoryBar";

export const HomePage: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 min-h-screen w-screen bg-black text-white md:hidden overflow-hidden">
      <StoryBar />
      <StoryViewer />
      </div>
      <div className="hidden md:flex w-screen h-screen items-center justify-center bg-black text-gray-100 text-xl">
        This app is only available on mobile devices.
      </div>
    </>
  );
};
