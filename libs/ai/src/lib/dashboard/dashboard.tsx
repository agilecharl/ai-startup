import { default as CrewsList } from '../crews/crews-list';
import { KpiDashboard } from '@ai-startup/utils';
import { TasksList } from '@ai-startup/ai';
import styles from './dashboard.module.css';
import { useState } from 'react';

const Kpis = [
  { title: 'Total Agents', value: 12 },
  { title: 'Active Crews', value: 5 },
  { title: 'Tasks Completed', value: 47 },
  { title: 'Pending Reviews', value: 3 }
];

export const Dashboard = () => {

  const [showTasks, setShowTasks] = useState(false);

  return (
    <div
      className={styles['container']}
      style={{
      minHeight: '100vh',

      display: 'flex',
      flexDirection: 'column',
      }}
    >
      <KpiDashboard kpis={Kpis} />
      <button
        className={styles['openTasksButton']}
        style={{ margin: '16px 0', alignSelf: 'flex-start' }}
        onClick={() => setShowTasks(true)}
      >
        AI Tasks
      </button>
      {showTasks && <TasksList onClose={() => setShowTasks(false)} />}
      {!showTasks && <CrewsList />}
    </div>
  );
}

export default Dashboard;
