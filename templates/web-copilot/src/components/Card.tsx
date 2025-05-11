// src/components/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export const Card = ({
  title,
  description,
  children,
  footer,
  className = '',
}: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        {description && <p className="text-gray-700 text-base">{description}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
      {footer && <div className="px-6 py-4 bg-gray-50">{footer}</div>}
    </div>
  );
};

Card.displayName = 'Card';
