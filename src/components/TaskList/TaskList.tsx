import { TaskItem } from '../TaskItem/TaskItem';
import { useTodos } from '../../context/TodoContext';
import styles from './TaskList.module.css';

function TaskList() {
  const { filteredTasks } = useTodos();

  return (
    <ul className={styles.taskList}>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
