import { createContext, useState } from "react";

export const CommentsContext = createContext();

export const CommentsProvider = (props) => {

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