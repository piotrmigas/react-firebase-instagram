export const GET_PAGINATED_POSTS = "GET_PAGINATED_POSTS";
export const GET_COMMENTS = "GET_COMMENTS";
export const LIKE_POST = "LIKE_POST";

export type Post = {
  id: string;
  caption: string;
  gridImg: string;
  postImg: string;
  likes: number;
  commentCount: number;
};

export type Com = {
  id: string;
  author: string;
  body: string;
  postId: string;
  timestamp: string;
};

export type State = {
  posts: Post[];
  comments: Com[];
  index: number;
};

export type GetPaginatedPosts = {
  type: typeof GET_PAGINATED_POSTS;
  posts: Post[];
};

export type GetComments = {
  type: typeof GET_COMMENTS;
  comments: any;
};

export type LikePost = {
  type: typeof LIKE_POST;
  index: number;
};

export type ActionTypes = GetPaginatedPosts | GetComments | LikePost;
