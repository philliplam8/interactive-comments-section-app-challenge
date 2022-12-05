import useSWR from "swr";
import { useState, useContext, useEffect, useMemo } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { Layout } from "../components/Layout";
import { Comments } from "../components/Comment";
import { CommentInput } from "../components/CommentInput";

export default function Home() {
  // const userValue = useContext(CommentsContext);
  // const [currentUser, setCurrentUser] = useState(userValue);
  const commentsValue = useContext(CommentsContext);
  const [displayedComments, setDisplayedComments] = useState(commentsValue);
  const [testComments, setTestComments] = useState([]);

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
  // Handle the loading state
  if (!data) return <div>loading...</div>;
  // Handle the happy path state
  else {
    const parsedData = JSON.parse(data.toString());
    const currentUser = parsedData.currentUser;
    return (
      <>
        <Layout>
          <div id="card-group" className="flex flex-col gap-5">
            {!data || Object.keys(parsedData).length === 0 ? (
              "skeleton loading tbd"
            ) : (
              <>
                <Comments allComments={parsedData} />
                {/* <Comments allComments={displayedComments} /> */}
                {/* <CommentInput rawData={currentUser} /> */}
                <CommentInput rawData={currentUser} isReply={false} />
              </>
            )}
          </div>
        </Layout>
      </>
    );
  }

  // Handle the loading state and the ready state and display the result contained in the data object
  // mapped to the structure of the json file
}
