// hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * Debounces a value after a specified delay.
 *
 * @param value The input value to debounce.
 * @param delay The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
