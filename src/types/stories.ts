export type UserStories = {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  stories: { id: string; url: string; }[];
}; 