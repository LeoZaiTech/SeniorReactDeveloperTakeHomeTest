import React from 'react';
import { TaskStatus, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import './TaskCard.css';

// Props Interface: Defines the contract for what data TaskCard needs

interface TaskCardProps {
  title: string;              
  description: string;       
  status: TaskStatus;         
  priority: TaskPriority;    
}


// Display Mappings:
// Record<K, V> creates an object type where keys are K and values are V
// TypeScript ensures every possible status/priority has a mapping


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

// Component Definition

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
}) => {

  const { colors } = useTheme();

  // Helper Functions

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

  // Render Section
  return (
    // Semantic <article> element - each task is a self-contained piece of content
    <article
      className="task-card"
      style={{
        backgroundColor: colors.surface,           // Theme-aware background
        borderColor: colors.border,                // Theme-aware border
        borderLeftColor: getStatusColor(status),   // Status indicator stripe
      }}
      aria-label={`Task: ${title}`}                // Accessibility: screen reader label
    >
      {/* HEADER: Title and Priority Badge */}
      <div className="task-card-header">
        <h3 className="task-card-title" style={{ color: colors.text }}>
          {title}
        </h3>
        {/* Priority badge with color + semi-transparent background (20 = 12% opacity in hex) */}
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
      
      {/* BODY: Description with fallback for empty string */}
      <p className="task-card-description" style={{ color: colors.textSecondary }}>
        {description || 'No description provided'}
      </p>
      
      {/* FOOTER: Status Badge */}
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

// Default export for flexible importing
export default TaskCard;
