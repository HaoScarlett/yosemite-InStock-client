import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchInventoryList = () => {
	return axios.get(`${API_URL}/api/inventories`);
};

export const fetchInventoryItem = (id) => {
	return axios.get(`${API_URL}/api/inventories/${id}`);
};



// Fetch warehouse data
export const fetchWarehouseList = () => {
	return axios.get(`${API_URL}/api/warehouses`);
};

export const fetchWarehouseItem = (id) => {
	return axios.get(`${API_URL}/api/warehouses/${id}`);
};

export const postWarehouse = (newWarehouse) =>{
	return axios.post(`${API_URL}/api/warehouses`, newWarehouse);
}
