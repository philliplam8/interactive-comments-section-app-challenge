import { useQuery, useMutation } from "@tanstack/react-query";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import {
  Comments,
  RawCurrentUserInterface,
  RawCommentInterface,
} from "../components/Comment";
import { CommentInput } from "../components/CommentInput";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () => fetch("/api/staticdata").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";

  console.log(data);
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
