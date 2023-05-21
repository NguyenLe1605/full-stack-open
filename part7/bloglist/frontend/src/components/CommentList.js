const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.div}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
