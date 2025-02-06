import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// const instance = axios.create({
//     baseURL: 'http://localhost:5000',
// })

export default instance;