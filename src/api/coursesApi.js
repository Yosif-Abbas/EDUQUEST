import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

export const fetchCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(`${API_URL}/courses`);
      resolve(response.data);
    }, 1500);
  });
};

export const fetchCourse = async (id) => {
  const response = await axios.get(`${API_URL}/courseDetails`);

  console.log(response.data);

  const course = response.data.find((course) => course.id === id);

  if (!course) {
    console.error('Course not found');
  }

  return course;
};
