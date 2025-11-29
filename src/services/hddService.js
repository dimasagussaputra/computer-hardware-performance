// src/services/hddService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const hddService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/hdd?${queryString}` : '/api/hdd';
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.HDD, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching HDDs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.HDD);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/hdd/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.HDD);
            const item = cachedData.find(hdd => hdd.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/hdd', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/hdd/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/hdd/${id}`);
    },
};