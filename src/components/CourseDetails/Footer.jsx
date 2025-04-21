import { FaArrowRight } from 'react-icons/fa';
import Button from '../Button';
import Card from '../Card';
import { useCourses } from '../../hooks/useCourses';

function Footer({ categories, currentCourseId }) {
  const { courses: relatedCourses } = useCourses(
    '',
    categories,
    '',
    currentCourseId,
  );

  if (relatedCourses.length < 1) return null;

  return (
    <footer className="bg-white pb-3">
      <div className="mx-auto w-fit px-4">
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
        <div className="overflow-x-auto">
          <ul className="flex w-max gap-x-6">
            {relatedCourses.slice(0, 4).map((course, index) => {
              let visibilityClass = '';
              if (index === 2) visibilityClass = 'hidden xl:block';
              if (index === 3) 'hidden 2xl:block';

              return (
                <Card
                  key={course.id}
                  course={course}
                  className={visibilityClass}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
