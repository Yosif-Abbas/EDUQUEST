import axios from 'axios';

const API_URL = 'http://localhost:3000/courses'; // Replace with your actual API URL

export const fetchCourses = async () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const response = await axios.get(API_URL);
      resolve(response.data);
    }, 1500);
  });
};
