// src/services/cpuService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const cpuService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/cpu?${queryString}` : '/api/cpu';
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.CPU, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching CPUs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.CPU);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/cpu/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.CPU);
            const item = cachedData.find(cpu => cpu.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/cpu', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/cpu/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/cpu/${id}`);
    },
};