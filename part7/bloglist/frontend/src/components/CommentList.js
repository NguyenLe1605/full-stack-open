const CommentList = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
