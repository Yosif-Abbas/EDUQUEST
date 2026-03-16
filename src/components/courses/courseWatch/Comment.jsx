import { FaRegComments } from 'react-icons/fa';

function Comment({ comment }) {
  return (
    <div key={comment.id} className="flex flex-col gap-y-3">
      <div className="flex items-start justify-start gap-x-4">
        <img
          src="https://picsum.photos/102"
          alt="student"
          className="w-10 rounded-full"
        />
        <div className="flex flex-col gap-y-3">
          {/* Name and Time */}
          <div className="flex items-center">
            <p>{comment.name} &bull;</p>

            <span className="ml-1 text-xs font-semibold text-gray-500">
              {comment.time_spent} ago
            </span>
          </div>

          {/* Comment */}
          <p className="text-sm font-normal text-gray-800">{comment.text}</p>
          <button className="list-icon w-fit text-sm text-gray-500">
            <FaRegComments size={20} />
            REPLAY
          </button>
        </div>
      </div>
      {/* Replys */}
      {comment.replays && comment.replays.length > 0 && (
        <div className="mt-3 ml-8 flex flex-col gap-y-3 border-l-2 border-gray-300 pl-4">
          {comment.replays.map((replay) => (
            <Comment comment={replay} key={replay.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
