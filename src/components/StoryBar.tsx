import React, { useEffect, useState, useRef } from "react";
import userData from "../assets/data/userData.json";
import { Users } from "../types/users";

interface Props {
  onSelect: (userId: string) => void;
  watched: { [userId: string]: boolean }
}

const BATCH_SIZE = 5;

export const StoryBar: React.FC<Props> = ({ onSelect, watched }) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsers(userData as Users[]);
  }, []);

  const hasMore = loadedCount < userData.length;

  const handleScroll = () => {
    const elem = scrollRef.current;

    if (!elem) return;
    const nearEnd = elem.scrollLeft + elem.clientWidth >= elem.scrollWidth - 15;
    if (nearEnd && hasMore) {
      setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, userData.length));
    }
  };

  return (
    <div className="flex items-center gap-2 py-2 bg-black">
      <div
        className="relative flex gap-4 overflow-x-auto scrollbar-hide ml-2"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {userData.map((user) => {
          const isWatched = watched[user.id]
          return (
            <div
              key={user.id}
              className="flex flex-col items-center min-w-[64px]"
            >
              <button
                onClick={() => onSelect(user.id)}
                className={`rounded-full overflow-hidden w-16 h-16 border-2 ${isWatched ? "border-gray-500" : "border-pink-500" }`}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </button>
              <span className="text-xs text-white mt-1 truncate w-16 text-center">
                {user.name}
              </span>
            </div>
          );
        })}
        {hasMore && (
          <div className="flex items-center justify-center min-w-[64px]">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
