import { useDispatch } from "react-redux";
import { likePost } from "../redux/actions";

type Props = {
  postId: string;
  likes: number;
  index: number;
};

const LikeButton: React.FC<Props> = ({ postId, likes, index }) => {
  const dispatch = useDispatch();

  return (
    <div className="like-btn">
      <i className="fas fa-heart pt-1" onClick={() => dispatch(likePost(postId, index))} />
      <span className="fw-bold"> {likes}</span>
    </div>
  );
};

export default LikeButton;
