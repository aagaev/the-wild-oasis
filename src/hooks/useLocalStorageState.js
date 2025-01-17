import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // console.log(storedValue); //false
    // console.log(JSON.parse(storedValue)); //false
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // console.log(initialState);//false
  // console.log(key); //isDarkMode
  // console.log(value); //false

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
