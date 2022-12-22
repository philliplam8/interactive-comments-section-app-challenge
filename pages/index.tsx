import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useContext, useEffect, useState } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import { Comments } from "../components/Comment";
import { CommentInput } from "../components/CommentInput";
import { SkeletonGroup } from "../components/Skeleton";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const { allDataValue } = useContext(CommentsContext);
  const [allData, setAllData] = allDataValue;

  // Google Firebase Authentication API
  const [user, loading] = useAuthState(auth);

  const resetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Layout>
      {isLoading ? (
        <SkeletonGroup />
      ) : (
        <>
          <button onClick={resetLocalStorage}>Reset</button>
          <div id="card-group" className="flex flex-col gap-5">
            <Comments
              currentUser={user ? user?.displayName : allData.demoUser}
            />
            <CommentInput isReply={false} />
          </div>
        </>
      )}
    </Layout>
  );
}
