import { default as CrewsList } from '../crews/crews-list';
import styles from './dashboard.module.css';

export const Dashboard = () => {
  return (
    <div className={styles['container']}>
      <section className={styles['kpiSection']}>
      <h2>Key Performance Indicators</h2>
      <div className={styles['kpiGrid']}>
        <div className={styles['kpiCard']}>
        <span className={styles['kpiValue']}>24</span>
        <span className={styles['kpiLabel']}>Active Tasks</span>
        </div>
        <div className={styles['kpiCard']}>
        <span className={styles['kpiValue']}>5</span>
        <span className={styles['kpiLabel']}>Crews</span>
        </div>
        <div className={styles['kpiCard']}>
        <span className={styles['kpiValue']}>12</span>
        <span className={styles['kpiLabel']}>Agents</span>
        </div>
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
