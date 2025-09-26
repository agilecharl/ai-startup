import { default as CrewsList } from '../crews/crews-list';
import { Kpi, KpiDashboard } from '@ai-startup/utils';
import styles from './dashboard.module.css';

const Kpis = [
  { title: 'Total Agents', value: 12 },
  { title: 'Active Crews', value: 5 },
  { title: 'Tasks Completed', value: 47 },
  { title: 'Pending Reviews', value: 3 }
];

export const Dashboard = () => {
  return (
    <div className={styles['container']}>
      <section className={styles['kpiSection']}>
        <KpiDashboard kpis={Kpis} />
      </section>
      <section className={styles['listSection']}>
        <CrewsList />
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
