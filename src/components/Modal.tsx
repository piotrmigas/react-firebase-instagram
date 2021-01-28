import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useHistory, useParams } from "react-router-dom";
import { State } from "../redux/store";

interface ParamTypes {
  id: string;
}

const Modal: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const posts = useSelector((state: State) => state.posts);
  const { id } = useParams<ParamTypes>();
  const post: any = posts.find((item) => item.id === id);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setLoading(true);
    image.src = post.postImg;
    setLoading(false);
    document.body.style.cssText = "overflow: hidden; padding-right: 16px";

    return () => {
      document.body.style.cssText = "overflow:unset; padding-right: 0";
    };
  }, [post.postImg]);

  const history = useHistory();
  const index = useSelector((state: State) => state.index);

  return !loading ? (
    <div className="spinner-bg">
      <Loader type="Watch" color="white" height={30} width={30} />
    </div>
  ) : (
    <>
      <div className="overlay" onClick={() => history.goBack()} />
      <div className="post-modal">
        <div className="row g-0">
          <div className="col-sm-7">
            <img src={post.postImg} alt="" />
            <TransitionGroup>
              <CSSTransition classNames="like" timeout={500} key={post.likes}>
                <span className="heart" />
              </CSSTransition>
            </TransitionGroup>
          </div>
          <div className="col-sm-5">
            <div className="content container">
              <div className="row">
                <div className="col-sm-11 mx-auto">
                  <h6 className="my-3">{post.caption}</h6>
                  <CommentForm postId={post.id} />
                  <Comments postId={post.id} />
                  <LikeButton postId={post.id} likes={post.likes} index={index} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
