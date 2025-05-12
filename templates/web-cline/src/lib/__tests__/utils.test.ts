import { describe, it, expect } from 'vitest';
import { formatDate, formatPrice, truncateText } from '../utils';

describe('Utility functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2023-05-15T10:30:00Z');
      expect(formatDate(date)).toContain('2023');
    });
  });

  describe('formatPrice', () => {
    it('formats price with currency symbol', () => {
      expect(formatPrice(1299)).toMatch(/¥1,299|$1,299|€1,299/);
    });
    
    it('handles zero values', () => {
      expect(formatPrice(0)).toMatch(/¥0|$0|€0/);
    });
  });
  
  describe('truncateText', () => {
    it('truncates text longer than max length', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 10)).toBe('This is a...');
    });
    
    it('does not truncate text shorter than max length', () => {
      const shortText = 'Short';
      expect(truncateText(shortText, 10)).toBe('Short');
    });
  });
});
