import { render } from '@testing-library/react';

import KpiDashboard from './kpi-dashboard';

describe('KpiDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KpiDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
