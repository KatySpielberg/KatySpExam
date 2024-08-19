import axios from 'axios';

export const fetchData = () => {
  return axios.get('http://localhost:3001/api/data');
};