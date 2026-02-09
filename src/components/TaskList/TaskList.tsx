import React from 'react';
import { Task, FilterStatus } from '../../types/task';
import { TaskCard } from '../TaskCard';
import { useTheme } from '../../context/ThemeContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
}

const filterLabels: Record<FilterStatus, string> = {
  'all': 'All',
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { colors } = useTheme();
  const { filteredTasks, filterStatus, setFilterStatus, filterOptions } = useTaskFilter(tasks);

  return (
    <section className="task-list-container">
      <nav className="task-list-filters" role="navigation" aria-label="Task filters">
        {filterOptions.map((option) => (
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
            {filterLabels[option]}
          </button>
        ))}
      </nav>

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
            {filterStatus === 'all' 
              ? 'There are no tasks to display.'
              : `No tasks with status "${filterLabels[filterStatus]}".`
            }
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
