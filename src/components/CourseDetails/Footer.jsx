import { FaArrowRight } from 'react-icons/fa';
import Button from '../Button';
import Card from '../Card';
import { useCourses } from '../../hooks/useCourses';
import Loading from '../Loading';

function Footer({ category }) {
  const { courses, isLoading } = useCourses();

  // Filter courses by matching category
  const relatedCourses =
    courses?.filter((course) => course.category === category) || [];

  if (relatedCourses?.length < 1) return null;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <footer className="bg-white p-3">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-2xl lg:text-3xl">Related Courses</h2>
        <Button
          type="neutral"
          className="flex items-center gap-4 py-3"
          size="sm"
        >
          View All <FaArrowRight />
        </Button>
      </div>

      <ul className="flex w-full snap-x justify-center gap-x-6 overflow-x-scroll">
        {relatedCourses.slice(0, 4).map((course) => {
          return (
            <Card key={course.id} course={course} className="snap-start" />
          );
        })}
      </ul>
    </footer>
  );
}

export default Footer;
