// src/services/gpuService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const gpuService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/gpu?${queryString}` : '/api/gpu';
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.GPU, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching GPUs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.GPU);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/gpu/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.GPU);
            const item = cachedData.find(gpu => gpu.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/gpu', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/gpu/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/gpu/${id}`);
    },
};