
// Union types for status and priority

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high';



// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}
// Filter Types: union of 'all' with base types for filter state

export type FilterStatus = 'all' | TaskStatus;

export type FilterPriority = 'all' | TaskPriority;
