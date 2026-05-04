import { useState } from 'react';
import type { TaskPriority } from '../../types';
import { useTodos } from '../../context/TodoContext';
import styles from './TaskForm.module.css';

export const TaskForm = () => {
  const { addTask } = useTodos();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTask({ name: name.trim(), priority });
      setName('');
      setPriority('medium');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
      <button type="submit" className={styles.button} disabled={!name.trim()}>
        Add
      </button>
    </form>
  );
};
