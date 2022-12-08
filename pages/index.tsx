import { useCommentsData } from "../hooks/useCommentsData";
import { Layout } from "../components/Layout";
import {
  Comments,
  RawCurrentUserInterface,
  RawCommentInterface,
} from "../components/Comment";
import { CommentInput } from "../components/CommentInput";

export default function Home() {
  const { isLoading, error, data } = useCommentsData();

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>An error has occurred</h2>;

  const parsedData = JSON.parse(data.toString());
  const allComments: RawCommentInterface[] = parsedData.comments;
  const currentUser: RawCurrentUserInterface = parsedData.currentUser;
  return (
    <>
      <Layout>
        <div id="card-group" className="flex flex-col gap-5">
          <Comments currentUser={currentUser} comments={allComments} />
          <CommentInput rawData={currentUser} isReply={false} />
        </div>
      </Layout>
    </>
  );
}
