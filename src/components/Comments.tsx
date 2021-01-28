import { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import Comment from "./Comment";
import { getComments } from "../redux/actions";
import { State } from "../redux/store";

const Comments: React.FC<{ postId: string }> = ({ postId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const comments = useSelector((state: State) => state.comments);

  const postComments = comments.filter((c) => c.postId === postId);

  return (
    <div className="comments my-2">
      <TransitionGroup>
        {postComments?.map((comment: any, i) => (
          <CSSTransition key={i} timeout={500} classNames="fade">
            <Comment postId={postId} comment={comment} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default Comments;
