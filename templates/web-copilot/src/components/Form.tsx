// src/components/Form.tsx
import { ReactNode, FormEvent } from 'react';
import { Button } from './Button';

interface FormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitText?: string;
  resetText?: string;
  showReset?: boolean;
  isSubmitting?: boolean;
  className?: string;
}

export const Form = ({
  onSubmit,
  children,
  submitText = '送信',
  resetText = 'リセット',
  showReset = false,
  isSubmitting = false,
  className = '',
}: FormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {children}
      <div className="flex justify-end space-x-2 pt-4">
        {showReset && (
          <Button type="reset" variant="secondary">
            {resetText}
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {submitText}
        </Button>
      </div>
    </form>
  );
};

Form.displayName = 'Form';
