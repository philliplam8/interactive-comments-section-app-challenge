// Raw Data from JSON file ------------------------------------------

export interface RawImage {
  png: string;
  webp: string;
}
export interface RawComment {
  id: string;
  content: string;
  createdAt: number;
  displayedDate: string;
  score: { [s: string]: number };
  username: string;
  hasReplies: boolean;
}

export interface RawReply {
  id: string;
  content: string;
  createdAt: number;
  displayedDate: string;
  score: { [s: string]: number };
  replyingTo: string;
  username: string;
}

// Flattened Data ----------------------------------------------------

export interface CommentProps {
  commentId: string;
  groupId: string;
  content: string;
  score: { [s: string]: number };
  replyingTo?: string;
  hasReplies: boolean;
  avatarPng: string;
  avatarWebp: string;
  username: string;
  createdAt: number;
  displayedDate: string;
  currentUser: string;
}
