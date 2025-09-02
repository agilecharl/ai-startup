import { render } from '@testing-library/react';

import Commerce from './commerce';

describe('Commerce', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Commerce />);
    expect(baseElement).toBeTruthy();
  });
});
