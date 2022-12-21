import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import { Comments } from "../components/Comment";
import { CommentInput } from "../components/CommentInput";
import { SkeletonGroup } from "../components/Skeleton";

export default function Home() {
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);
  if (loading) return <SkeletonGroup />;

  // Current User
  const currentUser: string = user ? user?.displayName : allData.demoUser;

  const resetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Layout>
      <button onClick={resetLocalStorage}>Reset</button>
      <div id="card-group" className="flex flex-col gap-5">
        {loading ? (
          <SkeletonGroup />
        ) : (
          <>
            <Comments currentUser={currentUser} />
            <CommentInput isReply={false} />
          </>
        )}
      </div>
    </Layout>
  );
}
