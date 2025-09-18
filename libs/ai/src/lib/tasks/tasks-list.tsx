import { getRecords } from '@ai-startup/data';
import { useEffect, useState } from 'react';
import './tasks-list.module.css';

type Task = {
  task: string;
  description: string;
  // add other properties if needed
};

const TasksList = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
   
    await getRecords('ai/tasks', {}).then((res) => {
      setTasks(res as Task[]);
    });

    return tasks;
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="tasks-container" style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h2 className="tasks-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
      🚀 Available AI Tasks
      </h2>
      <div className="tasks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
      {tasks && tasks.map((task) => (
        <div
        key={task.task}
        className="task-card"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '1rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: '1.5rem',
          transition: 'transform 0.2s',
          cursor: 'pointer',
        }}
        >
        <h3 className="task-name" style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600, color: '#2d3748' }}>
          {task.task}
        </h3>
        <p className="task-description" style={{ margin: 0, color: '#4a5568', fontSize: '1rem' }}>
          {task.description}
        </p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default TasksList;
