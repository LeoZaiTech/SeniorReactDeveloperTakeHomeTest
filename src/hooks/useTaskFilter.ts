import { useState, useMemo, useCallback } from 'react';
import { Task, FilterStatus, FilterPriority } from '../types/task';


// Return Type Interface:Defines the shape of what this hook returns to consumers
// This is the "contract" - components know exactly what they'll get
interface UseTaskFilterResult {

  filteredTasks: Task[];                        
  filterStatus: FilterStatus;                  
  setFilterStatus: (status: FilterStatus) => void; 
  statusOptions: FilterStatus[];              
  filterPriority: FilterPriority;              
  setFilterPriority: (priority: FilterPriority) => void;  
  priorityOptions: FilterPriority[];    
  searchQuery: string;
  setSearchQuery: (query: string) => void; //added to implement search feature
       
}

// Hook Defintion:
// INPUT: Array of tasks to filter

export const useTaskFilter = (tasks: Task[]): UseTaskFilterResult => {

  // OUTPUT: Filtered tasks + filter state + setters + options
  
//Destructure 

  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  // Added to implement search feature

  
  // Option Arrays:These arrays drive the filter button rendering in TaskList
  // Adding a new status here automatically creates a new button
  const statusOptions: FilterStatus[] = ['all', 'todo', 'in-progress', 'done', 'blocked'];  // Added 'blocked'
  const priorityOptions: FilterPriority[] = ['all', 'low', 'medium', 'high'];


  // Filter Logic Memoized
  // useMemo ensures we only recalculate when dependencies change

  //   FOR each task in tasks:
  //     IF filterStatus is 'all' OR task.status matches filterStatus:
  //       AND filterPriority is 'all' OR task.priority matches filterPriority:
  //         INCLUDE task in result
  //   RETURN filtered array
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {

      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase());
     // Const matchesSearch Added to implement search feature  
     // //Empty query matches all; otherwise case-insensitive title match
       
    
      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, filterStatus, filterPriority, searchQuery]);  // Added searchQuery to deps


  // Memoized Setters
  // useCallback ensures these functions maintain stable references
  // This prevents unnecessary re-renders in child components
  // Empty dependency array [] means these never need to be recreated
  const handleSetFilterStatus = useCallback((status: FilterStatus) => {
    setFilterStatus(status);
  }, []);

  const handleSetFilterPriority = useCallback((priority: FilterPriority) => {
    setFilterPriority(priority);
  }, []);


  // Return exposes everything the component needs
 
  return {
    filteredTasks,                              
    filterStatus,                               
    setFilterStatus: handleSetFilterStatus,     
    statusOptions,                              
    filterPriority,                             
    setFilterPriority: handleSetFilterPriority, 
    priorityOptions,                            
    searchQuery,                                // Current search query (added for search feature)
    setSearchQuery,                             // Handler to change search query
  };
};
