import { useEffect, useRef } from "react";

export const usePreviousValue = <T>(
  value: T,
  onChange: (newValue: T) => () => void
) => {
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;
    previousValue.current = value;
    return onChange(value);
  }, [value]);
};
