import React, { useState } from "react";
import { StoryViewer } from "../components/StoryViewer";
import { StoryBar } from "../components/StoryBar";
import userData from "../assets/data/userData.json";
import { Users } from "../types/users";

export const HomePage: React.FC = () => {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [activeUserIndex, setActiveUserIndex] = useState<number>(0);
  const [watched, setWatched] = useState<{ [userId: string]: boolean }>({});
  const userStoriesData = userData as Users[];

  const handleOnSelect = (userId: string) => {
    const userIndex = userStoriesData.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      setActiveUserIndex(userIndex);
      setActiveUserId(userStoriesData[userIndex].id);
    }
  };

    const sortedData = [
      ...userStoriesData.filter((user) => !watched[user.id]),
      ...userStoriesData.filter((user) => watched[user.id]),
    ];

  const handleViewerClose = () => {
    setActiveUserIndex(0);
    setActiveUserId(null);
  };

  const handlePrevUser = () => {
    if (activeUserIndex !== null && activeUserIndex > 0) {
      setActiveUserIndex(activeUserIndex - 1);
      setActiveUserId(userStoriesData[activeUserIndex].id)
    }else{
      setActiveUserId(null)
    }
  }

  const markAsWatched = (userId: string | null) => {
    if (userId && !watched[userId]) {
      const newWatched = { ...watched, [userId]: true };
      setWatched(newWatched);
    }
  }

  const nextUser = () => {
    if (activeUserIndex !== null) {
      markAsWatched(activeUserId)
      if (activeUserIndex < userStoriesData.length - 1) {
        setActiveUserIndex(activeUserIndex + 1);
        setActiveUserId(userStoriesData[activeUserIndex].id)
      } else {
        setActiveUserId(null)
      }
    }
  }

  return (
    <>
      <div className="fixed min-h-screen w-screen bg-black text-white md:hidden overflow-hidden">
        {activeUserId == null ? (
          <StoryBar 
          onSelect={handleOnSelect} 
          watched={watched} />
        ) : (
          <StoryViewer
            storyData={userStoriesData[activeUserIndex]}
            onClose={handleViewerClose}
            onPrevUser={handlePrevUser}
            onNextUser={nextUser}
            markAsWatched={markAsWatched}
          />
        )}
      </div>
      <div className="hidden md:flex w-screen h-screen items-center justify-center bg-black text-gray-100 text-2xl">
        This app is only available on mobile devices📱.
      </div>
    </>
  );
};
