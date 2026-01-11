import React from 'react';
import { Edit, Trash2, Calendar, Tag, Flag, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../UI/Button';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await onStatusChange(task._id, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{task.title}</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                aria-label="Edit task"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Delete task"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            <Flag size={12} className="inline mr-1" />
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-2" />
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <Tag size={14} className="text-gray-400 mt-1" />
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-gray-500">
            Created: {format(new Date(task.createdAt), 'MMM dd')}
          </span>
          <Button
            variant={task.status === 'completed' ? 'secondary' : 'primary'}
            size="sm"
            onClick={handleStatusChange}
            className="flex items-center space-x-1 text-sm"
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as complete'}
          >
            <CheckCircle size={14} />
            <span>{task.status === 'completed' ? 'Undo' : 'Complete'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;