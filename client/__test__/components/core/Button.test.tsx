import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Button from '@/components/core/Button/Button';

describe('Button test', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should render child', () => {
    render(<Button>Test child</Button>);
    expect(screen.getByText('Test child')).toBeDefined();
  });

  it('should find testid', () => {
    render(<Button data-testid="core-button">Test child</Button>);
    expect(screen.getByTestId('core-button')).toBeDefined();
  });
});
