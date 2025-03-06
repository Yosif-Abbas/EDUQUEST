import Button from '../Button';
import Spinner from '../Spinner';
import Comment from './Comment';

function CommentsSection({ comments }) {
  return (
    <div className="flex flex-col items-start gap-y-4">
      <h1 className="text-xl lg:text-2xl">Comments (154)</h1>
      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      <Button type="neutral" size="sm" className="list-icon">
        Load More {comments.length > 0 && <Spinner />}
      </Button>
    </div>
  );
}

export default CommentsSection;
