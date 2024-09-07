import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchInventoryList = () => {
	return axios.get(`${API_URL}/api/inventories`);
};

export const fetchInventoryItem = (id) => {
	return axios.get(`${API_URL}/api/inventories/${id}`);
};

export const fetchWarehousesList = () =>{
	return axios.get(`${API_URL}/api/warehouses`);
}