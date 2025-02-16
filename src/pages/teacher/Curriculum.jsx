import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { HiBars3 } from 'react-icons/hi2';
import { RiEdit2Line } from 'react-icons/ri';

function Curriculum() {
  return (
    <div>
      <div className="bg-[#9DB2BF] p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <HiBars3 />
            <h3>Sections (01):</h3>
            <p>(Section name)</p>
          </span>
          <span className="flex gap-2 text-gray-500">
            <button>
              <FaPlus />
            </button>
            <button>
              <RiEdit2Line />
            </button>
            <button>
              <FaRegTrashAlt />
            </button>
          </span>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between bg-white px-4 py-2">
            <div className="flex items-center gap-2">
              <HiBars3 />
              <span>(Lecture name)</span>
            </div>
            <div className="flex items-center gap-3">
              <select className="text-pinky-violet w-26 bg-[#FFEEE8] p-2">
                <option value="">Contents</option>
                <option value="video">Video</option>
                <option value="file">Attach File</option>
                <option value="test">Test</option>
              </select>
              <button>
                <RiEdit2Line />
              </button>
              <button className="text-[#E25E35]">
                <FaRegTrashAlt />
              </button>
            </div>
          </li>
        </ul>
      </div>
      <button className="text-pinky-violet mt-5 w-full bg-[#9DB2BF59] px-4 py-2">
        Add Section
      </button>
    </div>
  );
}

export default Curriculum;
