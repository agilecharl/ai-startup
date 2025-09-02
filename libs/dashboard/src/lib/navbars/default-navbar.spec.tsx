import { render } from '@testing-library/react';

import DefaultNavbar from './default-navbar';

describe('DefaultNavbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultNavbar />);
    expect(baseElement).toBeTruthy();
  });
});
