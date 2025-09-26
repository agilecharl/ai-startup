import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import styles from './kpi.module.css';

interface KpiProps {
  title: string;
  value: number | string;
}

export function Kpi({ title, value }: KpiProps) {
  return (
    <Card>
      <CardContent>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="h4" component="p">
        {value}
      </Typography>
      </CardContent>
    </Card>
  );
}

export default Kpi;
