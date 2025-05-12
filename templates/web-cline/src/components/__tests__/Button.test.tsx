import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies primary variant styling', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: /Primary/i });
    expect(button).toHaveClass('bg-blue-600');
  });

  it('applies secondary variant styling', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /Secondary/i });
    expect(button).toHaveClass('bg-gray-500');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /Disabled/i });
    expect(button).toBeDisabled();
  });
});
