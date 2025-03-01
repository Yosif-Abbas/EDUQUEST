import Comment from './Comment';

function CommentsSection({ comments }) {
  console.log(comments);
  return (
    <div>
      <h1 className="text-xl lg:text-2xl">Comments (154)</h1>
      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default CommentsSection;
