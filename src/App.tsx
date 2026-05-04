import { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import type { Task, FilterStatus } from './types';

const initialTasks: Task[] = [
  { id: 't1', name: 'Wash dishes', isCompleted: false, priority: 'medium' },
  { id: 't2', name: 'Mow grass', isCompleted: false, priority: 'high' },
  { id: 't3', name: 'Take out trash', isCompleted: true, priority: 'low' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<FilterStatus>('all');

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
    <section id="center">
      <h1>Activity Tasks
        Component Implementation</h1>
      <div className="card">
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
