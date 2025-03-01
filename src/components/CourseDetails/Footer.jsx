import { FaArrowRight } from 'react-icons/fa';
import Button from '../Button';
import Card from '../Card';
import { useCourses } from '../../hooks/useCourses';

function Footer() {
  const { courses: relatedCourses } = useCourses('', 'math');

  return (
    <footer className="bg-white">
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
            {relatedCourses
              .slice(0, 4)
              .map((course, index) =>
                index >= 2 ? (
                  <Card
                    key={course.id}
                    course={course}
                    className="hidden xl:block"
                  />
                ) : (
                  <Card key={course.id} course={course} />
                ),
              )}
          </ul>
        </div>
        <p className="py-2">©️ 2025 EduQuest. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
