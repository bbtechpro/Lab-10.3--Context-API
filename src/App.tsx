import './App.css';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import { TaskForm } from './components/TaskForm/TaskForm';
import { useTheme } from './context/ThemeContext';
import { useTodos } from './context/TodoContext';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { tasks, filteredTasks } = useTodos();

  return (
    <section id="center" style={{ width: '100%', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>Task Manager</h1>
        <button 
          onClick={toggleTheme}
          style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="card">
        <TaskForm />
        <TaskFilter />
        
        <TaskList />

        {tasks.length === 0 && <p style={{ marginTop: '1rem', textAlign: 'center' }}>No tasks left! Great job.</p>}
        {tasks.length > 0 && filteredTasks.length === 0 && (
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>No tasks match this filter.</p>
        )}
      </div>
    </section>
  );
}

export default App;
