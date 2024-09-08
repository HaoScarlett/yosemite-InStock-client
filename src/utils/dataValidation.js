// Utility function to normalize status
export const normalizeStatus = (status) => {
    return status.toLowerCase().replace(/\s+/g, '');
};

// Utility function to check if status is "in stock"
export const isInStock = (status) => {
    return normalizeStatus(status) === 'instock';
};