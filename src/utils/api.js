import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchInventoryList = () => {
	return axios.get(`${API_URL}/api/inventories`);
};

export const fetchInventoryItem = (id) => {
	return axios.get(`${API_URL}/api/inventories/${id}`);
};

export const updateInventoryItem = (id) => {
	return axios.put(`${API_URL}/api/inventories/${id}`);
}

export const fetchWarehousesList = () =>{
	return axios.get(`${API_URL}/api/warehouses`);
}

export const postWarehouse = (newWarehouse) =>{
	return axios.post(`${API_URL}/api/warehouses`, newWarehouse);
}