import React, { useState } from 'react';
import styles from './TaskList.module.css';

export interface Task {
  id: string;
  label: string;
  completed?: boolean;
}

export interface TaskListProps {
  assignedTasks?: Task[];
  completedTasks?: Task[];
  onToggle?: (id: string, completed: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  assignedTasks = [], completedTasks = [], onToggle,
}) => {
  const [tasks, setTasks] = useState<Task[]>([
    ...assignedTasks.map(t => ({ ...t, completed: false })),
    ...completedTasks.map(t => ({ ...t, completed: true })),
  ]);

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const task = tasks.find(t => t.id === id);
    if (task) onToggle?.(id, !task.completed);
  };

  const active    = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t =>  t.completed);

  return (
    <div className={styles.root}>
      {active.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>Assigned</h4>
          {active.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggle} />
          ))}
        </section>
      )}
      {completed.length > 0 && (
        <section className={styles.section}>
          <h4 className={styles.sectionTitle}>Complete</h4>
          {completed.map(task => (
            <TaskItem key={task.id} task={task} onToggle={toggle} />
          ))}
        </section>
      )}
    </div>
  );
};

const TaskItem: React.FC<{ task: Task; onToggle: (id: string) => void }> = ({ task, onToggle }) => (
  <label className={styles.item}>
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={task.completed}
      onChange={() => onToggle(task.id)}
    />
    <span className={[styles.label, task.completed ? styles.labelDone : ''].filter(Boolean).join(' ')}>
      {task.label}
    </span>
  </label>
);

TaskList.displayName = 'TaskList';
