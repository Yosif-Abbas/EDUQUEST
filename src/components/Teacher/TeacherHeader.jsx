import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../../hooks/useTeacher';
import Spinner from '../Spinner';

function TeacherHeader() {
  // const [showSearchInput, setShowSearchInput] = useState(false);
  // const [showNotification, setShowNotification] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);

  const { teacher = {}, isLoading } = useTeacher();
  const navigate = useNavigate();

  const {
    first_name: firstName,
    last_name: lastName,
    image_url: teacherImage,
  } = teacher;

  // function handleSearch() {
  //   setShowSearchInput((pre) => !pre);
  // }
  // function handleNotification() {
  //   setShowNotification((pre) => !pre);
  // }

  function handleProfile() {
    navigate('/teacher/dashboard');
  }

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-sm sm:text-xl">
        <span className="text-lg text-gray-500">Hello, Mr. </span>
        {firstName + ' ' + lastName}
      </h3>

      <button onClick={handleProfile}>
        <figure className="h-12 max-h-12 w-12 max-w-12 rounded-full">
          {isLoading ? (
            <Spinner size={25} color="white" />
          ) : (
            <img
              src={
                !teacherImage
                  ? 'https://szsrenycohgbwvlyieie.supabase.co/storage/v1/object/public/websitepics//default-user.jpg'
                  : teacherImage
              }
              alt="pictuer"
              className="h-12 w-12 rounded-full object-cover object-top"
            />
          )}
        </figure>
      </button>

      {/* <section className="relative z-20 flex items-center gap-3 text-lg">
        <button
          onClick={handleSearch}
          className="h-fit rounded-xl bg-white p-2 transition lg:hidden"
        >
          <IoIosSearch />
        </button>

        <form
          className={`absolute top-[110%] right-0 z-10 ${showSearchInput ? 'scale-y-100' : 'scale-y-0'} origin-top transition lg:relative lg:scale-y-100`}
        >
          <div>
            <input
              type="text"
              className="rounded-xl bg-white p-2 pl-8 text-[14px] outline-0 md:w-60 xl:w-80"
              placeholder="Search"
            />
            <span className="absolute top-1/2 left-4 block -translate-1/2">
              <IoIosSearch />
            </span>
          </div>
        </form>

        <button
          onClick={handleNotification}
          className="rounded-xl bg-white p-2 lg:p-2.5"
        >
          <FaRegBell />
        </button>

        <div
          className={`absolute top-[120%] right-13 h-100 w-70 rounded-xl bg-white p-2 ${!showNotification && 'hidden'}`}
        ></div>

        <div
          className={`absolute top-[120%] right-0 h-100 w-50 rounded-xl bg-white p-2 ${!showProfile && 'hidden'}`}
        ></div>
      </section> */}
    </div>
  );
}

export default TeacherHeader;
