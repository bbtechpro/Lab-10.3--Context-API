import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import { TaskForm } from './components/TaskForm/TaskForm';
import type { Task, FilterStatus, TaskPriority } from './types';

const initialTasks: Task[] = [
  { id: 't1', name: 'Wash dishes', isCompleted: false, priority: 'medium' },
  { id: 't2', name: 'Mow grass', isCompleted: false, priority: 'high' },
  { id: 't3', name: 'Take out trash', isCompleted: true, priority: 'low' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddTask = (newTask: { name: string; priority: TaskPriority }) => {
    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      priority: newTask.priority,
      isCompleted: false,
    };
    setTasks([...tasks, task]);
  };

  const handleToggle = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <section id="center" style={{ width: '100%', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0 }}>Task Manager</h1>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="card">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
        
        <TaskList 
          tasks={filteredTasks} 
          onToggle={handleToggle} 
          onDelete={handleDelete} 
        />

        {tasks.length === 0 && <p style={{ marginTop: '1rem', textAlign: 'center' }}>No tasks left! Great job.</p>}
        {tasks.length > 0 && filteredTasks.length === 0 && (
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>No tasks match this filter.</p>
        )}
      </div>
    </section>
  );
}

export default App;
