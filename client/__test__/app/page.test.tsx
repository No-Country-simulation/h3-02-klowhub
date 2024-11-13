import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RootPage from '@/app/page';

describe('Root page test', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should find root-page id', () => {
    render(<RootPage />);
    expect(screen.getByTestId('root-page')).toBeDefined();
  });
});
