import { render } from '@testing-library/react';

import CrudMenu from './crud-menu';

describe('CrudMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CrudMenu />);
    expect(baseElement).toBeTruthy();
  });
});
