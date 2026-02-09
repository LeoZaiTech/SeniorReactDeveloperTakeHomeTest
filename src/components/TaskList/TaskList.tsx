import React from 'react';
import { Task, FilterStatus, FilterPriority } from '../../types/task';
import { TaskCard } from '../TaskCard';
import { useTheme } from '../../context/ThemeContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
}

const statusLabels: Record<FilterStatus, string> = {
  'all': 'All',
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const priorityLabels: Record<FilterPriority, string> = {
  'all': 'All',
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { colors } = useTheme();
  const { 
    filteredTasks, 
    filterStatus, 
    setFilterStatus, 
    statusOptions,
    filterPriority,
    setFilterPriority,
    priorityOptions,
  } = useTaskFilter(tasks);

  return (
    <section className="task-list-container">
      <div className="filters-container">
        <div className="filter-group">
          <span className="filter-label" style={{ color: colors.textSecondary }}>Status:</span>
          <nav className="task-list-filters" aria-label="Filter by status">
            {statusOptions.map((option) => (
              <button
                key={option}
                className={`filter-button ${filterStatus === option ? 'active' : ''}`}
                onClick={() => setFilterStatus(option)}
                style={{
                  backgroundColor: filterStatus === option ? colors.statusInProgress : 'transparent',
                  color: filterStatus === option ? '#ffffff' : colors.text,
                  borderColor: colors.border,
                }}
                aria-pressed={filterStatus === option}
              >
                {statusLabels[option]}
              </button>
            ))}
          </nav>
        </div>

        <div className="filter-group">
          <span className="filter-label" style={{ color: colors.textSecondary }}>Priority:</span>
          <nav className="task-list-filters" aria-label="Filter by priority">
            {priorityOptions.map((option) => (
              <button
                key={option}
                className={`filter-button ${filterPriority === option ? 'active' : ''}`}
                onClick={() => setFilterPriority(option)}
                style={{
                  backgroundColor: filterPriority === option ? colors.priorityMedium : 'transparent',
                  color: filterPriority === option ? '#ffffff' : colors.text,
                  borderColor: colors.border,
                }}
                aria-pressed={filterPriority === option}
              >
                {priorityLabels[option]}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div 
          className="task-list-empty"
          style={{ 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            color: colors.textSecondary 
          }}
        >
          <span className="empty-icon">📋</span>
          <p className="empty-title" style={{ color: colors.text }}>No tasks found</p>
          <p className="empty-description">
            No tasks match the selected filters.
          </p>
        </div>
      ) : (
        <ul className="task-list" aria-label="Tasks">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-list-item">
              <TaskCard
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;
