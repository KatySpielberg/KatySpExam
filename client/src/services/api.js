import axios from 'axios';

export const fetchData = () => {
  console.log("Fetching data from API...");
  return axios.get('http://localhost:3001/api/data')
    .then(response => {
      console.log("Data received from API: ", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching data from API: ", error);
    });
};