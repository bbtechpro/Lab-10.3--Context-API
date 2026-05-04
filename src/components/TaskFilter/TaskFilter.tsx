import type { FilterStatus } from '../../types/index';
import { useTodos } from '../../context/TodoContext';
import styles from './TaskFilter.module.css';

const TaskFilter = () => {
  const { filter: currentFilter, setFilter } = useTodos();
  const filters: FilterStatus[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`${styles.filterButton} ${
            currentFilter === filter ? styles.filterButtonActive : ''
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
