import Card from '../components/Card';

import Math from '../assets/math.png';
import Arabic from '../assets/arabic.png';
import English from '../assets/english.png';
import Physics from '../assets/physics.png';
import Chemistry from '../assets/chemistry.png';

const fake_courses = [
  {
    id: 1,
    title: 'Algebra Mastery',
    subject: 'Math',
    price: 19.99,
    image: Math,
    rating: 4.7,
    students_enrolled: 1200,
  },
  {
    id: 2,
    title: 'Arabic for Beginners',
    subject: 'Arabic',
    price: 15.99,
    image: Arabic,
    rating: 4.5,
    students_enrolled: 800,
  },
  {
    id: 3,
    title: 'English Grammar Essentials',
    subject: 'English',
    price: 22.99,
    image: English,
    rating: 4.8,
    students_enrolled: 1500,
  },
  {
    id: 4,
    title: 'Physics Fundamentals',
    subject: 'Physics',
    price: 18.5,
    image: Physics,
    rating: 4.6,
    students_enrolled: 950,
  },
  {
    id: 5,
    title: 'Organic Chemistry Basics',
    subject: 'Chemistry',
    price: 20.0,
    image: Chemistry,
    rating: 4.9,
    students_enrolled: 1100,
  },
];

function Courses() {

  return (
    <div className="mx-12 my-6 flex gap-4">
      {fake_courses.map((course) => (
        <Card
          course={course}
          key={course.id}
        />
      ))}
    </div>
  );
}

export default Courses;
