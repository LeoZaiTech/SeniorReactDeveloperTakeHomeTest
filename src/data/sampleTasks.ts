import { Task } from '../types/task';

export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Create a comprehensive design system with color palette, typography, and component library documentation.',
    status: 'done',
    priority: 'high',
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate the REST API endpoints for user authentication and data fetching.',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Unit Testing',
    description: 'Write unit tests for all utility functions and custom hooks using Jest and React Testing Library.',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Analyze and optimize bundle size, implement code splitting and lazy loading for routes.',
    status: 'todo',
    priority: 'low',
  },
  {
    id: '5',
    title: 'User Dashboard',
    description: 'Build the main user dashboard with data visualization components and real-time updates.',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: '6',
    title: 'Documentation',
    description: 'Write comprehensive README and API documentation for the project.',
    status: 'done',
    priority: 'low',
  },
  {
    id: '7',
    title: 'Mobile Responsiveness',
    description: 'Ensure all components are fully responsive and work seamlessly on mobile devices.',
    status: 'todo',
    priority: 'high',
  },
  {
    id: '8',
    title: 'Accessibility Audit',
    description: '',
    status: 'todo',
    priority: 'medium',
  },
];
