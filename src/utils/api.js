import axios from 'axios';

console.log('API URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Axios instance with default API base URL
const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const postInventoryItem = (newItem) => {
	return api.post('/api/inventories', newItem);
};

export const fetchInventoryList = () => {
	return axios.get(`${API_URL}/api/inventories`);
};

export const fetchInventoryItem = (id) => {
	return axios.get(`${API_URL}/api/inventories/${id}`);
};

export const fetchInventoryCategory = (id) => {
	return axios.get(`${API_URL}/api/inventories/categories`);
};

export const updateInventoryItem = async (id, item) => {
	try {
		const response = await axios.put(
			`${API_URL}/api/inventories/${id}`,
			item
		);
		return response.data;
	} catch (error) {
		console.error('Error updating inventory item:', error.response?.data);
		throw error;
	}
};

export const fetchWarehousesList = () => {
	return axios.get(`${API_URL}/api/warehouses`);
};

export const fetchWarehouseItem = (id) => {
	return axios.get(`${API_URL}/api/warehouses/${id}`);
};

export const fetchSingleWarehouse = (id) => {
	return axios.get(`${API_URL}/api/warehouses/${id}`);
};

export const postWarehouse = (newWarehouse) => {
	return axios.post(`${API_URL}/api/warehouses`, newWarehouse);
};

export const updateWarehouse = async (id, updatedWarehouse) => {
	try {
		const response = await api.put(
			`${API_URL}/api/warehouses/${id}`,
			updatedWarehouse
		);
		return response.data;
	} catch (error) {
		console.error(`Error updating warehouse with ID ${id}:`, error);
		throw error;
	}
};

export const deleteInventoryItem = (id) => {
	return axios.delete(`${API_URL}/api/inventories/${id}`);
};

export const deleteWarehouse = (id) => {
	return axios.delete(`${API_URL}/api/warehouses/${id}`);
};

export const fetchSpecificInventory = (id) => {
	return axios.get(`${API_URL}/api/warehouses/${id}/inventories`);
};
