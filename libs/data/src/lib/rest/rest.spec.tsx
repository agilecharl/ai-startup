import { render } from '@testing-library/react';

import Rest from './rest';

describe('Rest', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rest />);
    expect(baseElement).toBeTruthy();
  });
});
