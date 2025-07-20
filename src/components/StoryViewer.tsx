import React, { useEffect, useRef, useState } from "react";
import { Users } from "../types/users";

interface Props {
  storyData: Users;
  onClose: () => void;
  onPrevUser: () => void;
  onNextUser: () => void;
  markAsWatched: (userId: string) => void;
}

export const StoryViewer: React.FC<Props> = ({ storyData,onClose,onPrevUser,onNextUser,markAsWatched,}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [storyIndex, setStoryIndex] = useState<number>(0);
  const stories = storyData.stories;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (storyIndex === stories.length - 1) {
      markAsWatched(storyData.id);
    }
  }, [storyIndex]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [storyIndex, storyData]);
  
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      nextStory();
    }, 5000);
  };


  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    if (x < window.innerWidth / 2) {
      prevStory();
    } else {
      nextStory();
    }
    if (hasError) setHasError(false);
  };

  const prevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    } else {
      onPrevUser();
      setStoryIndex(0);
    }
  };

  const nextStory = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      onNextUser();
      setStoryIndex(0);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* active user profile avatar */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <img
          src={storyData.avatar}
          alt={storyData.name}
          className="w-10 h-10 rounded-full border-2 border-pink-500 object-cover"
        />
        <span className="text-white font-semibold text-sm">
          {storyData.name}
        </span>
      </div>

      {/* story image */}
      <>
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {hasError ? (
          <div className="absolute flex flex-col items-center justify-center gap-4">
            Failed to load story
          </div>
        ) : (
          <img
            src={stories[storyIndex].url}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className={`w-full h-full object-contain ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onContextMenu={(e) => e.preventDefault()}
          />
        )}
      </>

      {/* close btn */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white bg-white/10 px-3 py-1 rounded-full"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};
