import axios from 'axios';
import type { Doctor, FilterOptions, ContactForm } from '../types';

const API_BASE_URL = 'https://localhost:7143/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const doctorsApi = {
  searchDoctors: async (filters: FilterOptions): Promise<Doctor[]> => {
    const response = await api.post<Doctor[]>('/Doctors/search', filters);
    return response.data;
  },

  getDoctorById: async (id: number): Promise<Doctor> => {
    const response = await api.get<Doctor>(`/Doctors/${id}`);
    return response.data;
  },

  submitContactForm: async (form: ContactForm): Promise<void> => {
    await api.post('/Doctors/contact', form);
  },
};