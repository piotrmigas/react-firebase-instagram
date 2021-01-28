import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import { db } from "../firebase";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { State } from "../redux/store";
import { Post } from "../redux/types";

interface ParamTypes {
  id: string;
}

const PostView: React.FC = () => {
  const [posts, setPosts] = useState<any>([]);
  const [pointer, setPointer] = useState<any>(null);

  useEffect(() => {
    db.collection("posts").onSnapshot((snap) => setPosts(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  }, []);

  const postIds = posts.map((i: Post) => i.id);
  const { id } = useParams<ParamTypes>();
  const postIndex = postIds.indexOf(id);

  const postsLength = posts.length;

  useEffect(() => {
    setPointer(postIndex);
  }, [postIndex]);

  const history = useHistory();

  const prev = () => {
    let newPointer = pointer === 0 ? postsLength - 1 : pointer - 1;
    setPointer(newPointer);
    history.push(`/view/${postIds[newPointer]}`);
  };

  const next = () => {
    let newPointer = pointer === postsLength - 1 ? 0 : pointer + 1;
    setPointer(newPointer);
    history.push(`/view/${postIds[newPointer]}`);
  };

  const post = posts.find((post: Post) => post.id === id);

  const index = useSelector((state: State) => state.index);

  return (
    <div className="postview-bg">
      {pointer > 0 && <i className="fas fa-chevron-left fa-2x" onClick={prev} />}
      {postsLength - 1 > pointer && <i className="fas fa-chevron-right fa-2x" onClick={next} />}
      <div className="post-modal">
        <div className="row g-0">
          <div className="col-sm-7">
            <img src={post?.postImg} alt="" />
            <TransitionGroup>
              <CSSTransition classNames="like" timeout={500} key={index}>
                <span className="heart" />
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className="col-sm-5">
            <div className="content container">
              <div className="row">
                <div className="col-sm-11 mx-auto">
                  <h6 className="my-3">{post?.caption}</h6>
                  <CommentForm postId={post?.id} />
                  <Comments postId={post?.id} />
                  <LikeButton postId={post?.id} likes={post?.likes} index={index} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
