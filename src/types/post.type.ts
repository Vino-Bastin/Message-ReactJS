export interface Post {
  _id: string;
  createdBy: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  createdAt: string;
  comments: number;
  thumbsUp: number;
  heart: number;
  laughs: number;
  angry: number;
  sad: number;
  isEdited?: boolean;
  editedAt?: string;
}

export interface PostsResponse {
  status: string;
  data: Post[];
}

export interface PostResponse {
  status: string;
  data: Post;
}

export interface ErrorResponse {
  status: string;
  path: string;
  errorType: string;
  message: string | string[];
}

export type ReactionType = "heart" | "thumbsUp" | "laughs" | "sad" | "angry";

export interface UpdateReaction {
  messageId: string;
  reaction: {
    [key in ReactionType]?: number;
  };
}
