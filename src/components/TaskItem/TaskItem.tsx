import type { TaskItemProps } from '../../types/index';
import { useTodos } from '../../context/TodoContext';
import styles from './TaskItem.module.css';

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useTodos();

  const priorityColor =
    task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#ca8a04' : '#16a34a';

  const itemStyle = {
    '--priority-color': priorityColor,
  } as React.CSSProperties;

  return (
    <li
      className={`${styles.taskItem} ${task.isCompleted ? styles.completed : ''}`}
      style={itemStyle}
    >
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => toggleTask(task.id)}
      />

      <span className={styles.taskName}>{task.name}</span>
      <span className={styles.priorityBadge}>
        {task.priority}
      </span>
      <button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

