import { useState, useMemo, useCallback } from 'react';
import { Task, FilterStatus, FilterPriority } from '../types/task';

interface UseTaskFilterResult {
  filteredTasks: Task[];
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  statusOptions: FilterStatus[];
  filterPriority: FilterPriority;
  setFilterPriority: (priority: FilterPriority) => void;
  priorityOptions: FilterPriority[];
}

export const useTaskFilter = (tasks: Task[]): UseTaskFilterResult => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');

  const statusOptions: FilterStatus[] = ['all', 'todo', 'in-progress', 'done'];
  const priorityOptions: FilterPriority[] = ['all', 'low', 'medium', 'high'];

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesStatus && matchesPriority;
    });
  }, [tasks, filterStatus, filterPriority]);

  const handleSetFilterStatus = useCallback((status: FilterStatus) => {
    setFilterStatus(status);
  }, []);

  const handleSetFilterPriority = useCallback((priority: FilterPriority) => {
    setFilterPriority(priority);
  }, []);

  return {
    filteredTasks,
    filterStatus,
    setFilterStatus: handleSetFilterStatus,
    statusOptions,
    filterPriority,
    setFilterPriority: handleSetFilterPriority,
    priorityOptions,
  };
};
