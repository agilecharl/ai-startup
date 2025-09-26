import styles from './kpi.module.css';

interface KpiProps {
  title: string;
  value: number | string;
}

export function Kpi({ title, value }: KpiProps) {
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>{title}</h2>
      <p className={styles['value']}>{value}</p>
    </div>
  );
}

export default Kpi;
