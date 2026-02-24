// ============================================
// IMPORTS
// ============================================
import React, { useState } from 'react';
// ThemeProvider: Wraps app to provide theme context
// useTheme: Hook to access theme state and colors
import { ThemeProvider, useTheme } from './context/ThemeContext';
// TaskList: Main component that displays filtered tasks
// TaskForm: Form component for adding new tasks (added for Add Task functionality)
import { TaskList, TaskForm } from './components';
// Sample data for demonstration
import { sampleTasks } from './data/sampleTasks';
// Task type for state typing
import { Task } from './types/task';
// Global app styles
import './App.css';

// ============================================
// APP CONTENT COMPONENT
// ============================================
// PURPOSE: Inner component that can access ThemeContext
// WHY SEPARATE? useTheme() must be called INSIDE ThemeProvider
// If we called useTheme in App directly, there'd be no provider above it
const AppContent: React.FC = () => {
  // Destructure everything we need from theme context
  // - theme: current mode ('light' or 'dark')
  // - toggleTheme: function to switch modes
  // - colors: object with all color values for current theme
  const { theme, toggleTheme, colors } = useTheme();

  // Lifted state for tasks (added for delete functionality)
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  
  // Form visibility state (toggle Add Task form)
  const [showForm, setShowForm] = useState(false);

  // Delete handler (added for delete functionality)
  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Add task handler (added for Add Task functionality)
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    setTasks(prev => [
      ...prev,
      { ...newTask, id: String(Date.now()) }
    ]);
  };

  // ----------------------------------------
  // RENDER: App layout structure
  // ----------------------------------------
  //   RENDER root div with theme background
  //     RENDER header with:
  //       - Title and subtitle
  //       - Theme toggle button
  //     RENDER main content:
  //       - TaskList with sample data
  //     RENDER footer
  return (
    <div 
      className="app" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* HEADER: Title + Theme Toggle */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle" style={{ color: colors.textSecondary }}>
            Manage your tasks efficiently
          </p>
        </div>
        {/* Theme Toggle Button */}
        {/* Shows opposite mode as action ("Dark" when in light mode) */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{
            backgroundColor: colors.surface,
            color: colors.text,
            borderColor: colors.border,
          }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      {/* MAIN: Task list component */}
      {/* TaskForm added for Add Task functionality */}
      <main className="app-main">
        <button
          className="add-task-toggle"
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: colors.statusInProgress,
            color: '#ffffff',
          }}
        >
          {showForm ? '✕ Cancel' : '+ Add New Task'}
        </button>
        
        {showForm && (
          <TaskForm onAddTask={(task) => {
            handleAddTask(task);
            setShowForm(false);  // Close form after adding
          }} />
        )}
        
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />

        
      </main>

      {/* FOOTER */}
      <footer className="app-footer" style={{ borderColor: colors.border }}>
        <p style={{ color: colors.textSecondary }}>
          Senior React Developer Take-Home Test
        </p>
      </footer>
    </div>
  );
};

// ============================================
// ROOT APP COMPONENT
// ============================================
// PURPOSE: Entry point that sets up providers
// PATTERN: Provider wrapper pattern
//   - ThemeProvider wraps entire app
//   - All children can access theme via useTheme()
//   - AppContent is separate so it can USE the context
function App() {
  return (
    // ThemeProvider creates the context "boundary"
    // Everything inside can call useTheme()
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Default export - this is what index.tsx renders
export default App;
