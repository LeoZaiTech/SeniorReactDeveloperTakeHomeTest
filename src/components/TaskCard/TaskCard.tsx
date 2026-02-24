import React from 'react';
// Types: TaskStatus and TaskPriority union types for type safety
import { TaskStatus, TaskPriority } from '../../types/task';
// Theme hook: Provides color values based on current theme (light/dark)
import { useTheme } from '../../context/ThemeContext';
import './TaskCard.css';

// Props Interface: Defines the contract for what data TaskCard needs

interface TaskCardProps {
  title: string;              
  description: string;        
  status: TaskStatus;       
  priority: TaskPriority;     
  dueDate?: string;           // Prop added for dueDate field
  onDelete?: () => void;      // Added for delete functionality
}


// Display Mappings:
// Record<K, V> creates an object type where keys are K and values are V
// TypeScript ensures every possible status/priority has a mapping


const statusLabels: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
  'blocked': 'Blocked',  // Added for blocked status
};


const priorityLabels: Record<TaskPriority, string> = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
};


const priorityIcons: Record<TaskPriority, string> = {
  'low': '↓',      // Down arrow = low urgency
  'medium': '→',   // Right arrow = normal
  'high': '↑',     // Up arrow = high urgency
};

// Component Definition

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  dueDate,
  onDelete,  // Added for delete functionality
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
      case 'blocked':  // Added for blocked status
        return colors.statusBlocked;
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

  // Render
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
      
      {/* Due Date Display Logic */}
      {dueDate && (
        <p className="task-card-due-date" style={{ color: colors.textSecondary }}>
          Due: {new Date(dueDate).toLocaleDateString()}
        </p>
      )}
      
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
        {/* Delete button (added for delete functionality) */}
        {onDelete && (
          <button 
            onClick={onDelete} 
            className="delete-btn"
            style={{ color: colors.text }}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
};

// Default export for flexible importing
export default TaskCard;
