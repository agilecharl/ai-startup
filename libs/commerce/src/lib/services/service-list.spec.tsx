import { render } from '@testing-library/react';

import ServiceList from './service-list';

describe('ServiceList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ServiceList />);
    expect(baseElement).toBeTruthy();
  });
});
