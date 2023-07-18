import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === "function") {
            // Accept whatever T this initialValue() returns
            return (initialValue as (() => T))()
        } else {
            return initialValue;
        }
    });

    //json.parse for objects and json.stringify for val conversion to string
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue]);

    return [value, setValue] as [T, typeof setValue];
}