// src/services/usbService.js
import { apiClient } from '../config/api';
import { dbManager, STORES } from '../utils/indexedDB';

export const usbService = {
    getAll: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.rank) params.append('rank', filters.rank);
            
            const queryString = params.toString();
            const endpoint = queryString ? `/api/usb?${queryString}` : '/api/usb'; 
            const data = await apiClient.get(endpoint);
            
            await dbManager.saveData(STORES.USB, data);
            
            return data;
        } catch (error) {
            console.error('API Error fetching USBs. Falling back to cache...');
            const cachedData = await dbManager.getData(STORES.USB);
            
            if (cachedData && cachedData.length > 0) {
                return cachedData;
            }
            
            throw new Error('No data available online or offline');
        }
    },
    
    getById: async (id) => {
        try {
            return await apiClient.get(`/api/usb/${id}`);
        } catch (error) {
            const cachedData = await dbManager.getData(STORES.USB);
            const item = cachedData.find(usb => usb.id === id);
            
            if (item) return item;
            throw error;
        }
    },
    
    create: async (data) => {
        return await apiClient.post('/api/usb', data);
    },
    
    update: async (id, data) => {
        return await apiClient.put(`/api/usb/${id}`, data);
    },
    
    delete: async (id) => {
        return await apiClient.delete(`/api/usb/${id}`);
    },
};