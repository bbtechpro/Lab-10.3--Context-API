import { TaskItem } from '../TaskItem/TaskItem';
import type { TaskListProps } from '../../types/index';
import styles from './TaskList.module.css';

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
