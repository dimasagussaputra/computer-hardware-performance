// src/services/ramService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const ramService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/ram?${queryString}` : '/api/ram';
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.RAM, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching RAMs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.RAM);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/ram/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.RAM);
            const item = cachedData.find(ram => ram.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/ram', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/ram/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/ram/${id}`);
    },
};