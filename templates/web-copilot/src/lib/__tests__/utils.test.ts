// src/lib/__tests__/utils.test.ts
import { isEmpty, formatErrorMessage, formatDate, debounce } from '../utils';

describe('isEmpty', () => {
  it('should return true for null or undefined', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('   ')).toBe(true);
  });

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  it('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });
});

describe('formatErrorMessage', () => {
  it('should return message from Error object', () => {
    const error = new Error('Test error');
    expect(formatErrorMessage(error)).toBe('Test error');
  });

  it('should convert non-Error to string', () => {
    expect(formatErrorMessage('Just a string')).toBe('Just a string');
    expect(formatErrorMessage(123)).toBe('123');
    expect(formatErrorMessage(null)).toBe('null');
  });
});

describe('formatDate', () => {
  it('should format date according to locale', () => {
    const date = new Date('2023-01-15');
    
    // テスト環境によって出力が変わる可能性があるので、厳密な文字列比較ではなく
    // 日付の部分が含まれているかを確認
    const formattedDate = formatDate(date, 'en-US');
    expect(formattedDate).toContain('2023');
    expect(formattedDate).toContain('January');
    expect(formattedDate).toContain('15');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('should delay function execution', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    expect(func).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(func).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(func).toBeCalled();
    expect(func).toBeCalledTimes(1);
  });

  it('should cancel previous timeout on repeated calls', () => {
    const func = jest.fn();
    const debouncedFunc = debounce(func, 1000);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();
    
    jest.advanceTimersByTime(999);
    expect(func).not.toBeCalled();
    
    jest.advanceTimersByTime(1);
    expect(func).toBeCalledTimes(1);
  });
});
