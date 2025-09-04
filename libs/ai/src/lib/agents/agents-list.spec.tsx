import { render } from '@testing-library/react';

import AgentsList from './agents-list ';

describe('AgentsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgentsList />);
    expect(baseElement).toBeTruthy();
  });
});
