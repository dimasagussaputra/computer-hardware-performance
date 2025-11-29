// src/services/ssdService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const ssdService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/ssd?${queryString}` : '/api/ssd';
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.SSD, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching SSDs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.SSD);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/ssd/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.SSD);
            const item = cachedData.find(ssd => ssd.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/ssd', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/ssd/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/ssd/${id}`);
    },
};