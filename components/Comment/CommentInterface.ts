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
  score: number;
  username: string;
  hasReplies: boolean;
}

export interface RawReply {
  id: string;
  content: string;
  createdAt: number;
  displayedDate: string;
  score: number;
  replyingTo: string;
  username: string;
}

// Flattened Data ----------------------------------------------------
export interface CardHeaderProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
  createdAt: number;
  displayedDate: string;
  currentUser: string;
}

export interface CommentProps extends CardHeaderProps {
  commentId: string;
  groupId: string;
  content: string;
  score: number;
  replyingTo?: string;
  hasReplies: boolean;
}
