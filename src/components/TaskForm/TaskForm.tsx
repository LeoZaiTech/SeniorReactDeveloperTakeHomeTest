import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import './TaskForm.css';

// Props Interface (added for Add Task functionality)
interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const { colors } = useTheme();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  // Submit handler (added for Add Task functionality)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({ title, description, status, priority });
    
    // Reset form
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
      <h3 style={{ color: colors.text }}>Add New Task</h3>
      
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
        style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
      />
      
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
        style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
      />
      
      <div className="form-row">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="form-select"
          style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
        
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="form-select"
          style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.border }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <button type="submit" className="form-submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
