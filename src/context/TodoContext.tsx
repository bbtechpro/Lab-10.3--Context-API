import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Task, FilterStatus, TaskPriority } from '../types';

interface TodoContextType {
  tasks: Task[];
  filter: FilterStatus;
  filteredTasks: Task[];
  setFilter: (filter: FilterStatus) => void;
  addTask: (task: { name: string; priority: TaskPriority }) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialTasks: Task[] = [
  { id: 't1', name: 'Wash dishes', isCompleted: false, priority: 'medium' },
  { id: 't2', name: 'Mow grass', isCompleted: false, priority: 'high' },
  { id: 't3', name: 'Take out trash', isCompleted: true, priority: 'low' },
];

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialTasks;
      }
    }
    return initialTasks;
  });
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: { name: string; priority: TaskPriority }) => {
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      priority: newTask.priority,
      isCompleted: false,
    };
    setTasks((prev) => [...prev, task]);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        tasks,
        filter,
        filteredTasks,
        setFilter,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
