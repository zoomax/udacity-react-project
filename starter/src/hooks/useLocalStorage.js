import { useState } from "react";

export const useLocalStorage = (key) => {
  const storedData = localStorage.getItem(`${key}`);
  const [store, setStore] = useState(
    storedData ? JSON.parse(storedData) : undefined,
  );
  const setData = (data) => {
    setStore(data);
    localStorage.setItem(`${key}`, JSON.stringify(data));
  };
  const resetDate = () => {
    setStore(undefined);
    localStorage.setItem(`${key}`, "");
  };
  return { store, setData, resetDate };
};
