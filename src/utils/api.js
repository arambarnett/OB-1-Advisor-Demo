import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Client API methods
export const clientApi = {
  getClients: () => api.get('/clients'),
  getClient: (id) => api.get(`/clients/${id}`),
  createClient: (data) => api.post('/clients', data),
  updateClient: (id, data) => api.put(`/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/clients/${id}`),
  getClientPortfolio: (id) => api.get(`/clients/${id}/portfolio`),
};

// Recommendations API methods
export const recommendationsApi = {
  getRecommendations: () => api.get('/recommendations'),
  getClientRecommendations: (clientId) => api.get(`/clients/${clientId}/recommendations`),
  createRecommendation: (data) => api.post('/recommendations', data),
  updateRecommendation: (id, data) => api.put(`/recommendations/${id}`, data),
  deleteRecommendation: (id) => api.delete(`/recommendations/${id}`),
};

// Risk assessment API methods
export const riskApi = {
  getRiskAssessments: () => api.get('/risk-assessments'),
  getClientRiskAssessment: (clientId) => api.get(`/clients/${clientId}/risk-assessment`),
  createRiskAssessment: (data) => api.post('/risk-assessments', data),
  updateRiskAssessment: (id, data) => api.put(`/risk-assessments/${id}`, data),
};

// Tasks API methods
export const tasksApi = {
  getTasks: () => api.get('/tasks'),
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  completeTask: (id) => api.patch(`/tasks/${id}/complete`),
};

// Reports API methods
export const reportsApi = {
  getReports: () => api.get('/reports'),
  getReport: (id) => api.get(`/reports/${id}`),
  generateReport: (type, params) => api.post('/reports/generate', { type, ...params }),
  downloadReport: (id, format) => api.get(`/reports/${id}/download?format=${format}`, {
    responseType: 'blob'
  }),
};

export default api;