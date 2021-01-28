import { FormEvent, useState, ChangeEvent } from "react";
import { db, increment } from "../firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const CommentForm: React.FC<{ postId: string }> = ({ postId }) => {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("comments").add({
      body,
      author,
      postId,
      timestamp: new Date(),
    });
    db.collection("posts").doc(postId).update({ commentCount: increment });
    setAuthor("");
    setBody("");
  };

  const handleEmoji = (emoji: any) => {
    setBody(body + emoji.native);
    setEmojiPicker(false);
  };

  return (
    <div className="row mb-2">
      <div className="col-sm-12">
        <form onSubmit={handleSubmit}>
          <div className="input-group input-group-sm mb-2">
            <input
              placeholder="author"
              autoComplete="off"
              value={author}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
              className="form-control shadow-none"
              required
            />
          </div>
          <div className="input-group input-group-sm">
            <input
              placeholder="comment"
              autoComplete="off"
              value={body}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
              className="form-control shadow-none"
              required
            />
            <span className="input-group-text" onClick={() => setEmojiPicker(!emojiPicker)}>
              <i className={!emojiPicker ? "far fa-smile-beam" : "fas fa-times"} />
            </span>
          </div>
          {emojiPicker && (
            <Picker
              onSelect={(emoji) => handleEmoji(emoji)}
              showPreview={false}
              showSkinTones={false}
              emojiSize={20}
              perLine={8}
            />
          )}
          <button type="submit" className="float-right mt-3">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
