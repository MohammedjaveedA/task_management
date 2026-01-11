import api from './api';

export const taskService = {
  getTasks: async (params = {}) => {
    try {
      const response = await api.get('/tasks', { params });
      return response;
    } catch (error) {
      console.error('Get tasks error:', error);
      throw error;
    }
  },

  getTask: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response;
    } catch (error) {
      console.error('Get task error:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response;
    } catch (error) {
      console.error('Create task error:', error);
      throw error;
    }
  },

 updateTask: async (id, taskData) => {
  try {
    console.log('📡 taskService.updateTask called');
    console.log('Task ID:', id);
    console.log('Task Data:', taskData);
    
    const response = await api.put(`/tasks/${id}`, taskData);
    console.log('📡 taskService.updateTask response:', response);
    
    return response;
  } catch (error) {
    console.error('❌ taskService.updateTask error:', error);
    throw error;
  }
},

  deleteTask: async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      return response;
    } catch (error) {
      console.error('Delete task error:', error);
      throw error;
    }
  },

  searchTasks: async (query) => {
    try {
      const response = await api.get('/tasks/search', { params: { q: query } });
      return response;
    } catch (error) {
      console.error('Search tasks error:', error);
      throw error;
    }
  },

  getTaskStats: async () => {
    try {
      const response = await api.get('/tasks/stats');
      return response;
    } catch (error) {
      console.error('Get task stats error:', error);
      throw error;
    }
  }
};