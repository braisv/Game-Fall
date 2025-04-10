import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      console.log("** TRY GET VALUE LOCAL STORAGE");
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log("** CATCH GET VALUE LOCAL STORAGE");
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    console.log({ newValue });
    try {
      console.log("** TRY SET VALUE LOCAL STORAGE");
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log("** CATCH SET VALUE LOCAL STORAGE");
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
