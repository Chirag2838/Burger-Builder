import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-18103.firebaseio.com/'
});

export default instance;