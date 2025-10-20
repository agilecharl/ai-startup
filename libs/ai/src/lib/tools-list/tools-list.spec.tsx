import { render } from '@testing-library/react';

import ToolsList from './tools-list';

describe('Tools', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToolsList onClose={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(baseElement).toBeTruthy();
  });
});
