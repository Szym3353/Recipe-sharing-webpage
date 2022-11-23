import { useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    let storageValue = localStorage.getItem(key);
    if (storageValue === null) {
      return initialValue;
    } else {
      return JSON.parse(storageValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as [T, typeof setValue];
}
