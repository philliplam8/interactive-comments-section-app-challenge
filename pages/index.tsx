import { getAuth } from "firebase/auth";
import { useCommentsData } from "../hooks/useCommentsData";
import { Layout } from "../components/Layout";
import {
  Comments,
  RawComment,
  RawReply,
  RawImage,
} from "../components/Comment";
import { CommentInput } from "../components/CommentInput";

export default function Home() {
  // Google Firebase Authentication API
  const auth = getAuth();
  const user = auth.currentUser;
  // React Query
  const { isLoading, error, data } = useCommentsData();
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>An error has occurred</h2>;

  // All data
  const parsedData = JSON.parse(data.toString());

  // Current User
  // const currentUser: string = parsedData.currentUser;
  console.log(user?.displayName);
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
          comments={parentComments}
          replies={childReplies}
          userAvatars={userAvatars}
        />
        <CommentInput username={currentUser} isReply={false} />
      </div>
    </Layout>
  );
}
