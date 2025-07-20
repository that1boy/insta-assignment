import React from "react";

interface storyViewerProps {
  activeUserId: string | null;
  onClose?: () => void
}

export const StoryViewer: React.FC<storyViewerProps> = ({activeUserId, onClose}) => {
  return (
    <>
    <div className="flex flex-row w-full justify-between p-4">
      active userID {activeUserId}
      <button onClick={onClose}>X</button>
    </div>
    </>
  );
};
