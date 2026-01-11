import React from 'react';
import { Search, Filter } from 'lucide-react';

const TaskFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-auto">
          <select
            className="input-field"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="w-full md:w-auto">
          <select
            className="input-field"
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value })}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="w-full md:w-auto">
          <select
            className="input-field"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;