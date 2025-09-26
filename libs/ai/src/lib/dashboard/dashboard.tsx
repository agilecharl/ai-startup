import { default as CrewsList } from '../crews/crews-list';
import { Kpi } from '@ai-startup/utils';
import styles from './dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={styles['container']}>     
      <section className={styles['kpiSection']}>
      <h2>Key Performance Indicators</h2>
      <div className={styles['kpiGrid']}>
        <Kpi title="Active Tasks" value={24} />
        <Kpi title="Crews" value={5} />
        <Kpi title="Agents" value={12} />
      </div>
      </section>
      <section className={styles['listSection']}>
      <CrewsList   />
      <div className={styles['listContainer']}>
        <h2>Agents</h2>
        <ul className={styles['list']}>
        <li>Jane Doe</li>
        <li>John Smith</li>
        <li>Alex Johnson</li>
        <li>Maria Garcia</li>
        <li>Chris Lee</li>
        <li>Emma Brown</li>
        <li>Olivia Wilson</li>
        <li>Liam Martinez</li>
        <li>Noah Kim</li>
        <li>Ava Patel</li>
        <li>Lucas Chen</li>
        <li>Sophia Clark</li>
        </ul>
      </div>
      </section>
    </div>
  );
}

export default Dashboard;
