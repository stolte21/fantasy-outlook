import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://fantasy-outlook.herokuapp.com/' : 'http://localhost:3001';
const outlookAPI = axios.create({
    baseURL
});

export default outlookAPI;