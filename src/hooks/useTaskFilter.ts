import { useState, useMemo, useCallback } from 'react';
import { Task, FilterStatus } from '../types/task';

interface UseTaskFilterResult {
  filteredTasks: Task[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  filterOptions: FilterStatus[];
}

export const useTaskFilter = (tasks: Task[]): UseTaskFilterResult => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filterOptions: FilterStatus[] = ['all', 'todo', 'in-progress', 'done'];

  const filteredTasks = useMemo(() => {
    if (filterStatus === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.status === filterStatus);
  }, [tasks, filterStatus]);

  const handleSetFilterStatus = useCallback((status: FilterStatus) => {
    setFilterStatus(status);
  }, []);

  return {
    filteredTasks,
    filterStatus,
    setFilterStatus: handleSetFilterStatus,
    filterOptions,
  };
};
