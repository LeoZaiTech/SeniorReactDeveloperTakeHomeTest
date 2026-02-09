import React from 'react';
import { TaskStatus, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import './TaskCard.css';

interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const statusLabels: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const priorityLabels: Record<TaskPriority, string> = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};

const priorityIcons: Record<TaskPriority, string> = {
  'low': '↓',
  'medium': '→',
  'high': '↑',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
}) => {
  const { colors } = useTheme();

  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return colors.statusTodo;
      case 'in-progress':
        return colors.statusInProgress;
      case 'done':
        return colors.statusDone;
    }
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
      case 'low':
        return colors.priorityLow;
      case 'medium':
        return colors.priorityMedium;
      case 'high':
        return colors.priorityHigh;
    }
  };

  return (
    <article
      className="task-card"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderLeftColor: getStatusColor(status),
      }}
      aria-label={`Task: ${title}`}
    >
      <div className="task-card-header">
        <h3 className="task-card-title" style={{ color: colors.text }}>
          {title}
        </h3>
        <span
          className="task-card-priority"
          style={{
            color: getPriorityColor(priority),
            backgroundColor: `${getPriorityColor(priority)}20`,
          }}
          aria-label={`Priority: ${priorityLabels[priority]}`}
        >
          <span className="priority-icon">{priorityIcons[priority]}</span>
          {priorityLabels[priority]}
        </span>
      </div>
      
      <p className="task-card-description" style={{ color: colors.textSecondary }}>
        {description || 'No description provided'}
      </p>
      
      <div className="task-card-footer">
        <span
          className="task-card-status"
          style={{
            color: getStatusColor(status),
            backgroundColor: `${getStatusColor(status)}20`,
          }}
          aria-label={`Status: ${statusLabels[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;
