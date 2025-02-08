import axios from 'axios';

const API_URL = 'http://localhost:3000/courses'; // Replace with your actual API URL

export const fetchCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
