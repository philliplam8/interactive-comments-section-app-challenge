// Raw Data from JSON file ------------------------------------------
interface RawCoreDataInterface {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

export interface RawReplyInterface extends RawCoreDataInterface {
  replyingTo: string;
}
export interface RawCommentInterface extends RawCoreDataInterface {
  replies: [];
}

export interface RawCurrentUserInterface {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

// Flattened Data ----------------------------------------------------
export interface CardHeaderProps {
  avatarPng: string;
  avatarWebp: string;
  username: string;
  createdAt: string;
  currentUser: RawCurrentUserInterface;
}

export interface CommentProps extends CardHeaderProps {
  id?: number;
  content: string;
  score: number;
  replyingTo?: string;
}

export interface ParentCommentProps extends CommentProps {
  replies: RawReplyInterface[];
}
