import { db, decrement } from "../firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
  postId: string;
  comment: {
    id: string;
    author: string;
    body: string;
    postId: string;
    timestamp: string;
  };
};

const Comment: React.FC<Props> = ({ comment, postId }) => {
  const deleteComment = () => {
    db.collection("comments").doc(comment.id).delete();
    db.collection("posts").doc(postId).update({ commentCount: decrement });
  };

  const time = (timestamp: any) => {
    const dateInMillis = timestamp.seconds * 1000;
    return dayjs(dateInMillis).fromNow();
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="comment">
          <b>{comment.author}</b>
          <p className="m-0">
            {comment.body}
            <button className="remove-comment" onClick={deleteComment}>
              &times;
            </button>
          </p>
          <p className="timestamp my-1">{time(comment.timestamp)}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
