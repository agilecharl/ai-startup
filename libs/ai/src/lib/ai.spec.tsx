import { render } from '@testing-library/react';

import Ai from './ai';

describe('Ai', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Ai />);
    expect(baseElement).toBeTruthy();
  });
});
