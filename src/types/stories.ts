export interface Users {
  id: string;
  name: string;
  avatar: string;
  stories: { id: string; url: string }[];
};
