import { render } from '@testing-library/react';

import Tasks from './tasks-list';

describe('Tasks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tasks />);
    expect(baseElement).toBeTruthy();
  });
});
