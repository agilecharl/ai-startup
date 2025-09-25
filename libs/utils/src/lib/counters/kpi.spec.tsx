import { render } from '@testing-library/react';

import Kpi from './kpi';

describe('Kpi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Kpi />);
    expect(baseElement).toBeTruthy();
  });
});
