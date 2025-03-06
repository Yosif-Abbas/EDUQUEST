import { LuDownload } from 'react-icons/lu';

function LectureNotes({ notes }) {
  return (
    <div>
      <div className="flex h-14 items-center justify-between">
        <h1 className="text-lg lg:text-xl">Lecture Notes</h1>
        <button className="list-icon bg-[#FFEEE8] px-3 py-2 text-sm text-[#526D82]">
          <LuDownload size={18} />
          Download Notes
        </button>
      </div>
      <p className="text-xs font-normal text-gray-500">{notes}</p>
    </div>
  );
}

export default LectureNotes;
