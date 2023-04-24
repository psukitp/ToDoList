import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;


const $api = axios.create({
    withCredentials: false,
    baseURL: process.env.REACT_APP_SERVER_URL
})


export default $api;