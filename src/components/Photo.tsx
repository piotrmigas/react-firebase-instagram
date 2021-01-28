import { Post } from "../redux/types";

const Photo: React.FC<{ post: Post }> = ({ post }) => (
  <div className="grid-item">
    <img src={post.gridImg} className="grid-item__img" alt="" />
    <div className="grid-item__info">
      <div className="d-flex h-100">
        <ul className="list-inline mx-auto my-auto justify-content-center">
          <li className="grid-item__likes list-inline-item">
            <h5>
              <i className="fas fa-heart" /> {post.likes}
            </h5>
          </li>
          <li className="grid-item__comments list-inline-item ml-4">
            <h5>
              <i className="fas fa-comment" /> {post.commentCount}
            </h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Photo;
