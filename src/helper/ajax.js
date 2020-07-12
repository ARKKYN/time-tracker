import axios from 'axios';

const token = localStorage.getItem('token');

const ajax = axios.create({
	baseURL: 'https://test-323.herokuapp.com/v1/graphql',
	headers: {Authorization: `Bearer ${token && token}`},
});

export default ajax;
