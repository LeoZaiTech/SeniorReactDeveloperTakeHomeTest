
// Union types for status and priority

export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'blocked';  // Added 'blocked' status

export type TaskPriority = 'low' | 'medium' | 'high';




export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // String added to incorporate dueDate field
}


export type FilterStatus = 'all' | TaskStatus;

export type FilterPriority = 'all' | TaskPriority;
