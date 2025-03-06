import { FaRegFileAlt } from 'react-icons/fa';
import Button from '../Button';

function LectureFile() {
  return (
    <div>
      <h1 className="lg:text-x h-10 text-lg">Lecture File</h1>
      <div className="flex items-center justify-between bg-white p-4">
        <div className="flex gap-x-3">
          <FaRegFileAlt size={38} color="#6a7282" />
          <div className="flex flex-col justify-between font-medium">
            <h2 className="text-sm">Lecture.pdf</h2>
            <p className="text-xs text-gray-500">12.6 MB</p>
          </div>
        </div>
        <Button size="sm">Download File</Button>
      </div>
    </div>
  );
}

export default LectureFile;
