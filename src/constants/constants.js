// First we need to import axios.js
import axios from "axios";
// Next we make an 'instance' of it

export const BASE_URL = "http://localhost";
export const STORE_SERVICE_PORT = "8000";
export const STORE_SERVICE_BASE_ENDPOINT_URL = `${BASE_URL}:${STORE_SERVICE_PORT}/api/`;

export const storeService = axios.create({
	// .. where we make our configurations
	baseURL: STORE_SERVICE_BASE_ENDPOINT_URL,
});

export const services = {
	storeService,
};

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// Also add/ configure interceptors && all the other cool stuff

// axios.interceptors.request.use(
// 	(request) => {
// 		console.log(request);
// 		return request;
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

// axios.interceptors.response.use(
// 	(response) => {
// 		console.log(response);
// 		// Edit response config
// 		return response;
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );

export default services;
