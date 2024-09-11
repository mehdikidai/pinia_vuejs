import axios from 'axios'

export const UseAxios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});
