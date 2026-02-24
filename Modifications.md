---
marp: true
theme: default
class: invert
paginate: true
---

# Added Features

How I would make changes to build on my assignment

---

## Change 1: Add dueDate Field

**Request**: *"Add a `dueDate` field to tasks and display it on the card"*

**Files Modified**: `task.ts` → `TaskCard.tsx` → `TaskList.tsx` → `sampleTasks.ts`

---

### dueDate — Step 1: Types

```typescript
// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;  // <-- Add optional field
}
```

---

### dueDate — Step 2: TaskCard Props

```typescript
// src/components/TaskCard/TaskCard.tsx
interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;  // <-- Add here too
}
```

---

### dueDate — Step 3: Display Logic

```tsx
// src/components/TaskCard/TaskCard.tsx
// Add below description, before footer
{dueDate && (
  <p className="task-card-due-date" style={{ color: colors.textSecondary }}>
    Due: {new Date(dueDate).toLocaleDateString()}
  </p>
)}
```

- **Conditional render** — Only renders if `dueDate` exists
- **Date formatting** — `toLocaleDateString()` for readable output

---

### dueDate — Step 4: Pass Prop in TaskList

```tsx
// src/components/TaskList/TaskList.tsx
<TaskCard
  title={task.title}
  description={task.description}
  status={task.status}
  priority={task.priority}
  dueDate={task.dueDate}  // <-- Add this line
/>
```

---

### dueDate — Step 5: Sample Data

```typescript
// src/data/sampleTasks.ts
{
  id: '1',
  title: 'Design System Setup',
  description: '...',
  status: 'done',
  priority: 'high',
  dueDate: '2025-01-15',  // <-- Add to some tasks
},
```

---

### dueDate — Verification

- Card displays "Due: 1/14/2025" format
- Cards without dueDate show nothing (no errors)
- TypeScript catches any missing prop updates 

---

## Change 2: Add Search Filter

**Request**: *"Add a search box to filter tasks by title"*

**Files Modified**: `useTaskFilter.ts` → `TaskList.tsx` → `TaskList.css`

---

### Search — Step 1: Add State

```typescript
// src/hooks/useTaskFilter.ts
const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
const [searchQuery, setSearchQuery] = useState<string>('');  // <-- NEW
```

---

### Search — Step 2: Update Interface

```typescript
// src/hooks/useTaskFilter.ts
interface UseTaskFilterResult {
  // ... existing properties
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
```

---

### Search — Step 3: Filter Logic

```typescript
// src/hooks/useTaskFilter.ts
const filteredTasks = useMemo(() => {
  return tasks.filter((task) => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesSearch = searchQuery === '' || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });
}, [tasks, filterStatus, filterPriority, searchQuery]);
```

---

### Search — Step 4: Return & Destructure

```typescript
// src/hooks/useTaskFilter.ts - add to return
return { ...existing, searchQuery, setSearchQuery };

// src/components/TaskList/TaskList.tsx - destructure
const { searchQuery, setSearchQuery, ...rest } = useTaskFilter(tasks);
```

---

### Search — Step 5: Input JSX

```tsx
// src/components/TaskList/TaskList.tsx
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
```

---

### Search — Verification

- Type in search box → list filters in real-time
- Empty search → shows all (respects other filters)
- Case-insensitive matching

---

## Change 3: Delete Functionality

**Request**: *"Add a delete button to each task card"*

**Files Modified**: `App.tsx` → `TaskList.tsx` → `TaskCard.tsx`

---

### Delete — Step 1: Lift State

```tsx
// src/App.tsx
const [tasks, setTasks] = useState<Task[]>(sampleTasks);
```

- Tasks now in React state (not static import)
- Enables mutations (add, delete, update)

---

### Delete — Step 2: Handler

```tsx
// src/App.tsx
const handleDeleteTask = (taskId: string) => {
  setTasks(prev => prev.filter(t => t.id !== taskId));
};
```

- **Immutable update** — `filter` returns new array
- **Functional update** — `prev =>` ensures latest state

---

### Delete — Step 3a: Pass to TaskList

```tsx
// src/App.tsx
<TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
```

---

### Delete — Step 3b: TaskList Interface

```tsx
// src/components/TaskList/TaskList.tsx
interface TaskListProps {
  tasks: Task[];
  onDeleteTask?: (taskId: string) => void;  // Added for delete functionality
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
```

---

### Delete — Step 3c: Pass to TaskCard

```tsx
// src/components/TaskList/TaskList.tsx
<TaskCard
  title={task.title}
  description={task.description}
  status={task.status}
  priority={task.priority}
  dueDate={task.dueDate}
  onDelete={() => onDeleteTask?.(task.id)}  // Added for delete functionality
/>
```

- **Optional chaining** — `onDeleteTask?.()` handles undefined safely

---

### Delete — Step 4: TaskCard Button

```tsx
// TaskCard.tsx - update interface
interface TaskCardProps {
  // ... existing
  onDelete?: () => void;
}

// In JSX footer
{onDelete && (
  <button onClick={onDelete} className="delete-btn">
    Delete
  </button>
)}
```

---

### Delete — Verification

- Click delete → task removed from list
- No page refresh needed
- TypeScript enforces prop types

---

## Change 4: Add Blocked Status

**Request**: *"Add a 'blocked' status with full filter support"*

**Files Modified**: `task.ts` → `ThemeContext.tsx` → `TaskCard.tsx` → `TaskList.tsx` → `useTaskFilter.ts`

---

### Blocked — Step 1: Types

```typescript
// src/types/task.ts
export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked';

// FilterStatus auto-includes 'blocked' via: 'all' | TaskStatus
```

---

### Blocked — Step 2: Theme Colors

```typescript
// src/context/ThemeContext.tsx

// In ThemeColors interface:
statusBlocked: string;

// In lightColors:
statusBlocked: '#9b59b6',

// In darkColors:
statusBlocked: '#a855f7',
```

---

### Blocked — Step 3: TaskCard Mappings

```typescript
// src/components/TaskCard/TaskCard.tsx

// In statusLabels:
'blocked': 'Blocked',

// In getStatusColor switch:
case 'blocked':
  return colors.statusBlocked;
```

---

### Blocked — Step 4: TaskList & Hook

```typescript
// TaskList.tsx - statusLabels
'blocked': 'Blocked',

// useTaskFilter.ts - statusOptions
const statusOptions: FilterStatus[] = [
  'all', 'todo', 'in-progress', 'done', 'blocked'
];
```

**Button appears automatically** — mapped from `statusOptions`!

---

### Blocked — Step 5: Sample Data

```typescript
// src/data/sampleTasks.ts
{
  id: '9',
  title: 'Blocked Task Example',
  description: 'Waiting on external dependency',
  status: 'blocked',
  priority: 'high',
},
```

---

### Blocked — Verification

- New "Blocked" filter button appears
- Cards show purple status badge
- Filtering works correctly
- TypeScript catches missing mappings

---

## Change 5: Add Task Form

**Request**: *"Add a form to create new tasks with toggle button"*

**Files Modified**: `TaskForm.tsx` (new) → `TaskForm.css` (new) → `index.ts` → `App.tsx` → `App.css`

---

### Add Task — Step 1: Props Interface

```tsx
// src/components/TaskForm/TaskForm.tsx
import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void;
}
```

- **Omit<Task, 'id'>** — TypeScript utility removes `id` from Task type
- Parent component will generate the ID

---

### Add Task — Step 2: Component State

```tsx
// src/components/TaskForm/TaskForm.tsx
export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const { colors } = useTheme();
  
  // Form state - controlled inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
```

- **Controlled components** — React state drives input values
- **Default values** — `'todo'` and `'medium'` for new tasks

---

### Add Task — Step 3: Submit Handler

```tsx
// src/components/TaskForm/TaskForm.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim()) return;  // Validation
  
  onAddTask({ title, description, status, priority });
  
  // Reset form
  setTitle('');
  setDescription('');
  setStatus('todo');
  setPriority('medium');
};
```

- **preventDefault** — stops page refresh
- **Validation** — empty titles rejected
- **Reset** — form clears after submit

---

### Add Task — Step 4: Form JSX

```tsx
// src/components/TaskForm/TaskForm.tsx
<form onSubmit={handleSubmit} className="task-form">
  <input
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />
  <textarea
    placeholder="Description (optional)"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
```

---

### Add Task — Step 5: Select Dropdowns

```tsx
// src/components/TaskForm/TaskForm.tsx
<div className="form-row">
  <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
    <option value="todo">To Do</option>
    <option value="in-progress">In Progress</option>
    <option value="done">Done</option>
    <option value="blocked">Blocked</option>
  </select>
  
  <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>
<button type="submit">Add Task</button>
```

- **Type assertion** — `as TaskStatus` ensures type safety

---

### Add Task — Step 6: Export Component

```tsx
// src/components/TaskForm/index.ts
export { TaskForm } from './TaskForm';

// src/components/index.ts
export { TaskForm } from './TaskForm';  // Add to barrel export
```

---

### Add Task — Step 7: App Handler

```tsx
// src/App.tsx
import { TaskList, TaskForm } from './components';

// Add task handler
const handleAddTask = (newTask: Omit<Task, 'id'>) => {
  setTasks(prev => [
    ...prev,
    { ...newTask, id: String(Date.now()) }
  ]);
};
```

- **Spread operator** — adds new task to existing array
- **Date.now()** — generates unique ID

---

### Add Task — Step 8: Toggle State

```tsx
// src/App.tsx
// Form visibility state
const [showForm, setShowForm] = useState(false);
```

- **Hidden by default** — cleaner initial UI
- **Toggle pattern** — button shows/hides form

---

### Add Task — Step 9: Toggle Button JSX

```tsx
// src/App.tsx
<button
  className="add-task-toggle"
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? '✕ Cancel' : '+ Add New Task'}
</button>

{showForm && (
  <TaskForm onAddTask={(task) => {
    handleAddTask(task);
    setShowForm(false);  // Auto-close after adding
  }} />
)}
```

- **Conditional render** — `{showForm && ...}`
- **Auto-close** — form hides after successful submit

---

### Add Task — Verification

- Toggle button shows/hides form
- Form submits new task
- Task appears in list immediately
- Form resets and closes after submit
- Validation prevents empty titles

---

# Summary

| Scenario | Key Concepts |
|----------|-------------|
| dueDate | Optional props, conditional render |
| Search | Hook state, controlled inputs |
| Delete | State lifting, callback props |
| Blocked | Union types, Record mappings |
| Add Task | Form handling, Omit<T, K> |

---
