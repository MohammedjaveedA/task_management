import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';
import TaskCard from '../components/Tasks/TaskCard';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import Button from '../components/UI/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    'in-progress': 0,
    completed: 0,
  });
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: '-createdAt',
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);
      setTasks(response.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      // Handle different response structures
      if (response.data) {
        setStats(response.data);
      } else if (response.success && response.data) {
        setStats(response.data);
      } else {
        // Set default stats if API returns different structure
        setStats({
          total: tasks.length,
          pending: tasks.filter(t => t.status === 'pending').length,
          'in-progress': tasks.filter(t => t.status === 'in-progress').length,
          completed: tasks.filter(t => t.status === 'completed').length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch statistics');
      // Calculate stats from local tasks as fallback
      setStats({
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  useEffect(() => {
    if (tasks.length > 0) {
      fetchStats();
    }
  }, [tasks]);

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      toast.success('Task created successfully');
      setShowTaskForm(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.error || 'Failed to create task');
    }
  };

const handleUpdateTask = async (id, taskData) => {
  try {
    console.log('🚀 UPDATE TASK DEBUG START 🚀');
    console.log('Task ID to update:', id);
    console.log('Update data:', taskData);
    console.log('Current token:', localStorage.getItem('token'));
    console.log('API URL:', import.meta.env.VITE_API_URL);
    
    // Test if taskService is available
    console.log('taskService available:', !!taskService);
    console.log('taskService.updateTask:', taskService.updateTask);
    
    // Call the update API
    console.log('📤 Calling API...');
    const response = await taskService.updateTask(id, taskData);
    console.log('✅ API Response:', response);
    
    if (response && response.success !== false) {
      toast.success('Task updated successfully');
      setEditingTask(null);
      setShowTaskForm(false);
      fetchTasks(); // Refresh the task list
    } else {
      console.error('❌ API returned error:', response);
      toast.error(response?.error || 'Failed to update task');
    }
    
  } catch (error) {
    console.error('❌ CATCH BLOCK ERROR DETAILS:');
    console.error('Error object:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error response data:', error.response?.data);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    console.log('🚀 UPDATE TASK DEBUG END 🚀');
    
    // Check specific error types
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error:', error.response.status);
      
      if (error.response.status === 401) {
        toast.error('Session expired. Please login again.');
        // Clear token and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (error.response.status === 404) {
        toast.error('Task not found. It may have been deleted.');
      } else if (error.response.status === 400) {
        toast.error('Invalid request. Please check the data.');
      } else {
        toast.error(`Server error: ${error.response.status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      toast.error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      toast.error('Error: ' + error.message);
    }
  }
};

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your tasks and track progress</p>
        </div>
        <Button
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.pending || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
              <Clock size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.['in-progress'] || 0}</p>
            </div>
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <AlertCircle size={24} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.completed || 0}</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? 
                (data) => handleUpdateTask(editingTask._id, data) : 
                handleCreateTask
              }
              onCancel={() => {
                setShowTaskForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Task List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="card text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full mb-4">
            <Calendar size={32} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first task</p>
          <Button
            onClick={() => setShowTaskForm(true)}
            className="flex items-center space-x-2 mx-auto"
          >
            <Plus size={20} />
            <span>Create Task</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleUpdateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;