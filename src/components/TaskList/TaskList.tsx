import React from 'react';
import { Task, FilterStatus, FilterPriority } from '../../types/task';
import { TaskCard } from '../TaskCard';
import { useTheme } from '../../context/ThemeContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import './TaskList.css';


// Props interface: TaskList only needs the raw task array
// All filtering is handled internally via useTaskFilter
interface TaskListProps {
  tasks: Task[];  // Array of tasks to display and filter
}


//Display Mappings: Maps filter values to human-readable button labels
// Includes 'all' option (unlike TaskCard which only has actual statuses)

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


// Component Definition 
// Container component that displays filtered tasks

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Get theme colors for dynamic styling
  const { colors } = useTheme();
  

  // HOOK: Consumption Get all filter state and handlers 
  // useTaskFilter encapsulates:
  //   - Filter state (current selections)
  //   - Filtered results (memoized)
  //   - Setter functions (memoized)
  //   - Options arrays (for rendering buttons)
  const { 
    filteredTasks,       // Tasks that match current filters
    filterStatus,        // Current status selection
    setFilterStatus,     // Handler to change status filter
    statusOptions,       // ['all', 'todo', 'in-progress', 'done']
    filterPriority,      // Current priority selection
    setFilterPriority,   // Handler to change priority filter
    priorityOptions,     // ['all', 'low', 'medium', 'high']
    searchQuery,         // Current search query (added for search feature)
    setSearchQuery,      // Handler to change search query
  } = useTaskFilter(tasks);

  // ----------------------------------------
  // RENDER Section
  // ----------------------------------------

  return (
    <section className="task-list-container">
      {/* FILTERS SECTION */}
      <div className="filters-container">
        
        {/* Search Input (added for search feature) */}
        <div className="task-list-search">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            style={{
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: colors.border,
            }}
          />
        </div>
        
        {/* Status Filter Group */}
        <div className="filter-group">
          <span className="filter-label" style={{ color: colors.textSecondary }}>Status:</span>
          <nav className="task-list-filters" aria-label="Filter by status">
            {/* Map over options to generate buttons dynamically */}
            {/* Adding a new status to statusOptions auto-creates its button */}
          
          
            {/* Filter Buttons*/} 
            {statusOptions.map((option) => (
              <button
                key={option}
                className={`filter-button ${filterStatus === option ? 'active' : ''}`}
                onClick={() => setFilterStatus(option)}
                style={{
                  // Active button gets highlight color, inactive is transparent
                  backgroundColor: filterStatus === option ? colors.statusInProgress : 'transparent',
                  color: filterStatus === option ? '#ffffff' : colors.text,
                  borderColor: colors.border,
                }}
                aria-pressed={filterStatus === option}  // Accessibility: toggle button state
              >
                {statusLabels[option]}
              </button>
            ))}
          </nav>
        </div>


{/* End of Filter Buttons Section */}

        {/* Priority Filter Group - same pattern as status */}

               {/*
                Same structure as Status Filter Group:
                - filter-group div wraps label + nav
                - Semantic <nav> with aria-label for accessibility
                - Label styled with textSecondary color
            */}    


        <div className="filter-group">
          <span className="filter-label" style={{ color: colors.textSecondary }}>Priority:</span>
          <nav className="task-list-filters" aria-label="Filter by priority">
     

            {/* 
                Filter ButtonsFOR each option in priorityOptions:
                  CREATE button element with:
                    - key={option} for React reconciliation
                    - Dynamic className: 'active' if selected
                    - onClick: call setFilterPriority(option)
                    - Inline styles: highlighted if active, else transparent
                    - aria-pressed: accessibility toggle state
                    - Label from priorityLabels mapping
            */}
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

      {/* CONDITIONAL RENDER: Empty state vs Task list */}
      {filteredTasks.length === 0 ? (
        // Empty State - shown when no tasks match filters
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
        // Task List - semantic <ul> with <li> items
        <ul className="task-list" aria-label="Tasks">
          {/* Map filtered tasks to TaskCard components */}
          {/* key={task.id} ensures React can track items efficiently */}
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-list-item">
              {/* Pass individual props rather than task object */}
              {/* This makes TaskCard's dependencies explicit */}
              <TaskCard
                title={task.title}
                description={task.description}
                status={task.status}
                priority={task.priority}
                dueDate={task.dueDate}
              />

              
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

// Default export for flexible importing
export default TaskList;
