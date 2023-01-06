import React, {useEffect, useContext} from 'react';
import * as SecureStore from "expo-secure-store";
import { createContext, useState } from "react";
import isDarkMode from './darkModeUtil';
// Initiate context
const ThemeContext = createContext();
export const useTheme = () => {
  const context = useContext(ThemeContext);
    if (!context)
  throw new Error('ThemeContext must be used with ThemeProvider')
  return context;
  }
const ThemeProvider = ({ children }) => {

  const isDM = isDarkMode();
  // Manage theme state
  const [theme, setTheme] = useState("light");
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const findOldTheme = async () => {
    const mode = await SecureStore.getItemAsync("mode");
    if (mode !== null) {
      mode === "light" ? setTheme("light") : setTheme("dark");
    } else {
      const devicePref =  isDM ? "dark" : "light"; 
      setTheme(devicePref);
      await SecureStore.setItemAsync("mode", devicePref);
    }
    setIsLoadingTheme(false);
  };

  const toggleTheme = async () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
      await SecureStore.setItemAsync("mode", newTheme);
  }

  useEffect(() => {
    findOldTheme();
    }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
