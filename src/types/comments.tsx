export type CommentUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Comment = {
  id: string;
  date: string;
  user: CommentUser;
  comment: string;
  rating: number;
};

export type Comments = Comment[];
