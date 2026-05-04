import type { TaskFilterProps, FilterStatus } from '../../types/index';
import styles from './TaskFilter.module.css';

const TaskFilter = ({ currentFilter, onFilterChange }: TaskFilterProps) => {
  const filters: FilterStatus[] = ['all', 'active', 'completed'];

  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
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
