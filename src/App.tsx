import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { TaskList } from './components';
import { sampleTasks } from './data/sampleTasks';
import './App.css';

const AppContent: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <div 
      className="app" 
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Task Manager</h1>
          <p className="app-subtitle" style={{ color: colors.textSecondary }}>
            Manage your tasks efficiently
          </p>
        </div>
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

      <main className="app-main">
        <TaskList tasks={sampleTasks} />
      </main>

      <footer className="app-footer" style={{ borderColor: colors.border }}>
        <p style={{ color: colors.textSecondary }}>
          Senior React Developer Take-Home Test
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
