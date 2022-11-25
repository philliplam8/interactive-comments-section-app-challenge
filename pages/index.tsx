import useSWR from "swr";
import { Layout } from "../components/Layout";
import { CommentReplies, Comments } from "../components/Comment";
import { Modal } from "../components/Modal";
import { ReplyInput } from "../components/ReplyInput";

export default function Home() {
  // Fetcher functop to wrap the native fetch function and return the result of a call to url in json format
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // Set up SWR to run the fetch function when calling '/api/staticdata'
  // There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/staticdata", fetcher);

  // Handle the error state
  if (error)
    return (
      <Layout>
        <div className="my-8">Failed to load jobs</div>
      </Layout>
    );

  // Handle the loading state and the ready state and display the result contained in the data object
  // mapped to the structure of the json file
  return (
    <>
      <Layout>
        <div id="card-group" className="flex flex-col gap-5">
          {!data ? "" : <Comments allComments={JSON.parse(data.toString())} />}
          {/* User's own new comment */}
          <ReplyInput />
        </div>
      </Layout>
      <Modal />
    </>
  );
}
