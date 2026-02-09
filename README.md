# Task Manager - Senior React Developer Take-Home Test

A set of reusable task management components demonstrating component architecture, TypeScript, and modern React patterns.

## Setup Instructions

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

## Design Decisions

1. **Component Architecture**: Separated concerns with `TaskCard` for individual task display and `TaskList` as the container with filtering logic. The `useTaskFilter` custom hook extracts filter state management for reusability and testability.

2. **Theme System**: Implemented via React Context with a centralized color palette, enabling consistent styling across components and easy theme switching without prop drilling.

3. **Accessibility & UX**: Added ARIA labels, keyboard navigation support, smooth hover transitions, and responsive grid layout that adapts from multi-column on desktop to single-column on mobile.

## Project Structure

```
src/
├── components/
│   ├── TaskCard/          # Individual task display component
│   └── TaskList/          # Container with filtering
├── context/
│   └── ThemeContext.tsx   # Light/dark theme provider
├── hooks/
│   └── useTaskFilter.ts   # Filter logic custom hook
├── types/
│   └── task.ts            # TypeScript interfaces
├── data/
│   └── sampleTasks.ts     # Demo data
└── App.tsx                # Main demo application
```

## Features

- **TaskCard**: Displays task with title, description, color-coded status badge, and priority indicator
- **TaskList**: Renders tasks in responsive grid with status filtering (All/Todo/In Progress/Done)
- **Theme Toggle**: Light/dark mode with smooth transitions
- **Empty State**: Graceful handling when no tasks match filter
- **Responsive Design**: Adapts layout for mobile and desktop

## Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
