import { Kpi } from '@ai-startup/utils';
import styles from './kpi-dashboard.module.css';

interface KpiDashboardProps {
  kpis:[
    {
      title: string;
      value: number | string;
    }
  ];
}

export function KpiDashboard(props: KpiDashboardProps) {
  return (
    <div className={styles['container']} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {props.kpis && props.kpis.map((KpiComponent, idx) => (
        <div
          key={idx}
          className={styles['kpi-item']}
          style={{
            flex: '1 0 calc(16.66% - 16px)', // 100% / 6 = 16.66%
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          <Kpi title={KpiComponent.title} value={KpiComponent.value} />
        </div>
      ))}
    </div>
  );
}

export default KpiDashboard;
