import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCommentsData } from "../hooks/useCommentsData";
import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import {
  Comments,
  RawComment,
  RawReply,
  RawImage,
} from "../components/Comment";
import { CommentInput } from "../components/CommentInput";

export default function Home() {
  const { commentsValue } = useContext(CommentsContext);
  const [allData, setAllData] = commentsValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  // React Query
  const { isLoading, error, data } = useCommentsData();
  if (isLoading || loading) return <h2>Loading...</h2>;
  if (error) return <h2>An error has occurred</h2>;

  // All data
  const parsedData = allData;
  // Current User
  // const currentUser: string = parsedData.currentUser;
  // console.log(user?.displayName);
  const currentUser: string = user ? user?.displayName : parsedData.currentUser;
  // Images
  const userAvatars: { [x: string]: RawImage } = parsedData.users;
  // Comments
  const parentComments: RawComment[] = Object.values(parsedData.comments);
  // Replies
  const childReplies = parsedData.replies;

  return (
    <Layout>
      <div id="card-group" className="flex flex-col gap-5">
        <Comments
          currentUser={currentUser}
          replies={childReplies}
          userAvatars={userAvatars}
        />
        <CommentInput username={currentUser} isReply={false} />
      </div>
    </Layout>
  );
}
