export interface CardHeaderProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
  createdAt: string;
  currentUser: boolean;
}

export interface CommentProps extends CardHeaderProps {
  id?: number;
  content: string;
  score: number;
}

export interface ParentCommentProps extends CommentProps {
  replies: CommentProps[];
}
