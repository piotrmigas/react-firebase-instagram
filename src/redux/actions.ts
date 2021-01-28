import { Post, GET_PAGINATED_POSTS, GET_COMMENTS, ActionTypes } from "./types";
import { db, increment } from "../firebase";
import { Dispatch } from "redux";

export const getPaginatedPosts = (posts: Post[]): ActionTypes => {
  return {
    type: GET_PAGINATED_POSTS,
    posts,
  };
};

export const getComments = () => (dispatch: Dispatch<ActionTypes>) => {
  db.collection("comments")
    .orderBy("timestamp", "desc")
    .onSnapshot((snap) =>
      dispatch({ type: GET_COMMENTS, comments: snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) })
    );
};

export const likePost = (postId: string, index: number): ActionTypes => {
  db.collection("posts").doc(postId).update({ likes: increment });
  return {
    type: "LIKE_POST",
    index,
  };
};
