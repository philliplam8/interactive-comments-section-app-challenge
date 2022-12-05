import useSWR from "swr";
import { createContext, useState, useEffect } from "react";

export const CommentsContext = createContext();

export const CommentsProvider = (props) => {

    // Fetcher functop to wrap the native fetch function and return the result of a call to url in json format
    // const fetcher = (url) => fetch(url).then((res) => res.json());

    // // Set up SWR to run the fetch function when calling '/api/staticdata'
    // // There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
    // const { data, error } = useSWR("/api/staticdata", fetcher);


    // // Parse the json file
    // const parsedFileContents = (JSON.parse(data.toString()));

    // // Create intial state data from data.json
    // const initialCurrentUser = parsedFileContents.currentUser;
    // const initialComments = parsedFileContents.comments;

    const [currentUser, setCurrentUser] = useState({});
    const [displayedComments, setDisplayedComments] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };



    return (
        <CommentsContext.Provider value={{
            uservalue: [currentUser, setCurrentUser],
            commentsValue: [displayedComments, setDisplayedComments],
            modalValue: [showModal, handleModalToggle]
        }}>
            {props.children}
        </CommentsContext.Provider>
    )
}