'use client';

import {useState, useEffect, useCallback} from 'react';

function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error);
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((val: T) => T)) => {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				if (typeof window !== 'undefined') {
					window.localStorage.setItem(key, JSON.stringify(valueToStore));
				}
			} catch (error) {
				console.warn(`Error setting localStorage key "${key}":`, error);
			}
		},
		[key, storedValue],
	);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleStorageChange = (event: StorageEvent): void => {
				if (event.key === key && event.newValue !== null) {
					setStoredValue(JSON.parse(event.newValue) as T);
				}
			};
			window.addEventListener('storage', handleStorageChange);
			return () => {
				window.removeEventListener('storage', handleStorageChange);
			};
		}
		return () => {};
	}, [key]);

	return [storedValue, setValue];
}

export default useLocalStorage;
