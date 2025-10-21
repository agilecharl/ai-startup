import { default as CrewsList } from '../crews/crews-list';
import { KpiDashboard } from '@ai-startup/utils';
import { AgentsList, TasksList, ToolsList } from '@ai-startup/ai';
import styles from './dashboard.module.css';
import { useEffect, useState } from 'react';

const Kpis = [
  { title: 'Total Agents', value: 12 },
  { title: 'Active Crews', value: 5 },
  { title: 'Tasks Completed', value: 47 },
  { title: 'Pending Reviews', value: 3 }
];

export const Dashboard = () => {

  const [showTasks, setShowTasks] = useState(false);
  const [showAgents, setShowAgents] = useState(false);
  const [showTools, setShowTools] = useState(false);

  useEffect(() => {
    setShowAgents(false);
    setShowTasks(false);
    setShowTools(false);  
  }, []);

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
      <div style={{ display: 'flex', gap: '12px', margin: '16px 0', alignSelf: 'flex-start' }}>
        <button
          className={styles['openAgentsButton']}
          onClick={() => setShowTasks(!showTasks)}
        >
          {showTasks ? 'Hide Tasks' : 'AI Tasks'}
        </button>
        <button
          className={styles['openAgentsButton']}
          onClick={() => setShowAgents(!showAgents)}
        >
          {showAgents ? 'Hide Agents' : 'AI Agents'}
        </button>
        <button
          className={styles['openToolsButton']}
          onClick={() => setShowTools(!showTools)}
        >
          {showTools ? 'Hide Tools' : 'AI Tools'}
        </button>
      </div>
      {showAgents && !showTasks && !showTools && <AgentsList />}
      {showTasks && !showAgents && !showTools && <TasksList onClose={() => setShowTasks(false)} />}
      {showTools && !showAgents && !showTasks && <ToolsList onClose={() => setShowTools(false)} />}
      {!showTasks && !showAgents && !showTools && <CrewsList />}
    </div>
  );
}

export default Dashboard;
