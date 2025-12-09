import axios from 'axios';

// CREATE AXIOS INSTANCE
const api = axios.create({
baseURL: 'http://192.168.0.228:5000/api', 
  timeout: 10000,
});

// LOGIN
export const loginAPI = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// REGISTER
export const registerAPI = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// GET TASKS
export const getTasksAPI = async (token) => {
  try {
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.tasks;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// CREATE TASK
export const createTaskAPI = async (token, title, description, due_date) => {
  try {
    const response = await api.post(
      '/tasks',
      { title, description, due_date },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.task;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;