export type FilterStatus = 'all' | 'active' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
  priority: TaskPriority;
}

export interface TaskItemProps {
  task: Task;
}