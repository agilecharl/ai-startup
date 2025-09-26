import { default as CrewsList } from '../crews/crews-list';
import { KpiDashboard } from '@ai-startup/utils';
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
      </section>
    </div>
  );
}

export default Dashboard;
