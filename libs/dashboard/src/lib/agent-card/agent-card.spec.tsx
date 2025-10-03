import { render } from '@testing-library/react';

import AgentCards from './agent-card';

describe('AgentCards', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgentCards />);
    expect(baseElement).toBeTruthy();
  });
});
