import type { CSSProperties } from 'react';
import type { TaskItemProps } from '../../types/index';
import styles from './TaskItem.module.css';

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const priorityColor =
    task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a';

  const itemStyle = {
    '--priority-color': priorityColor,
  } as CSSProperties;

  return (
    <li
      className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ''}`}
      style={itemStyle}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
      />

      <span className={styles.taskName}>{task.name}</span>
      <span className={styles.priorityBadge}>
        {task.priority}
      </span>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
};

