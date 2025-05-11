// src/components/TextField.tsx
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helpText,
      fullWidth = true,
      required = false,
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    // 自動的にIDを生成（渡されていない場合）
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            ${
              error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }
          `}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-description` : undefined}
          {...props}
        />
        {helpText && !error && (
          <p
            className="mt-1 text-sm text-gray-500"
            id={`${inputId}-description`}
          >
            {helpText}
          </p>
        )}
        {error && (
          <p
            className="mt-1 text-sm text-red-600"
            id={`${inputId}-error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
