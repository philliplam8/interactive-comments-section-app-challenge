import { useState, useContext, useEffect } from "react";
import { CommentsContext } from "../../context/CommentsContext";
import {
  CommentContainer,
  RawCommentInterface,
  RawCurrentUserInterface,
} from "./";

export default function Comments(props: {
  currentUser: RawCurrentUserInterface;
  comments: RawCommentInterface[];
}): JSX.Element {
  const [parentComments, setParentComments] = useState(props.comments);
  const [currentUser, setCurrentUser] = useState(props.currentUser.username);

  // const userValue = useContext(CommentsContext);
  // const [currentUser, setCurrentUser] = useState(userValue);
  // const commentsValue = useContext(CommentsContext);
  // const [displayedComments, setDisplayedComments] = useState(commentsValue);
  return (
    <>
      {parentComments.map((entry: RawCommentInterface) => {
        return (
          <CommentContainer
            key={entry.id}
            currentUser={currentUser}
            content={entry.content}
            avatarPng={entry.user.image.png}
            avatarWebp={entry.user.image.webp}
            createdAt={entry.createdAt}
            score={entry.score}
            username={entry.user.username}
            replies={entry.replies}
          />
        );
      })}
    </>
  );
}
