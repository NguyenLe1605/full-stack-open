import { postComment } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CommentPost = ({ blogid }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const addComment = (event) => {
    event.preventDefault();
    dispatch(postComment(blogid, comment));
    setComment("");
  };

  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></input>
      <button>add comment</button>
    </form>
  );
};

export default CommentPost;
