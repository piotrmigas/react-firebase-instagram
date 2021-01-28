import { ActionTypes, State, GET_PAGINATED_POSTS, GET_COMMENTS, LIKE_POST } from "./types";

const initialState: State = {
  posts: [],
  comments: [],
  index: 0,
};

export const reducer = (state = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case GET_PAGINATED_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    case LIKE_POST:
      return {
        ...state,
        index: action.index + 1,
      };
    default:
      return state;
  }
};
