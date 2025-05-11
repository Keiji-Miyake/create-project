// src/components/__tests__/TextField.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextField } from '../TextField';

describe('TextField', () => {
  it('renders correctly with label', () => {
    render(<TextField label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('shows required indicator when required prop is true', () => {
    render(<TextField label="Username" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(<TextField label="Email" error="Invalid email format" />);
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('displays help text when provided and no error', () => {
    render(<TextField label="Password" helpText="Must be at least 8 characters" />);
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('prioritizes error over help text', () => {
    render(
      <TextField 
        label="Password" 
        helpText="Must be at least 8 characters"
        error="Password is too short"
      />
    );
    expect(screen.getByText('Password is too short')).toBeInTheDocument();
    expect(screen.queryByText('Must be at least 8 characters')).not.toBeInTheDocument();
  });

  it('applies custom container class name', () => {
    render(<TextField label="Test" containerClassName="custom-class" data-testid="field" />);
    const container = screen.getByTestId('field').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
