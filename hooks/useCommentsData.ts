import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CommentProps, RawComment } from "../components/Comment";

const fetchComments = async () => {
  return axios.get("/api/staticdata").then((res) => res.data);
};

// const addCommentData = (comment: CommentProps) => {
//   return axios.post("/api/test", comment);
// };

const updateCommentData = (comment: any) => {
  return axios.post("/api/updateComment", comment);
};

export const useCommentsData = () => {
  return useQuery({
    queryKey: ["comments"],
    queryFn: () => fetchComments(),
  });
};

// export const useAddCommentsData = () => {
//   return useMutation(addCommentData);
// };

export const useUpdateCommentData = () => {
  return useMutation(updateCommentData);
};
