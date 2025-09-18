import { render } from '@testing-library/react';

import Crews from './crews-list';

describe('Crews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Crews />);
    expect(baseElement).toBeTruthy();
  });
});
