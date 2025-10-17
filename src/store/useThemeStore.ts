"use client";

import { create } from "zustand";

type ThemeStore = {
  darkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
};

// Load initial value safely (client-side)
const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  darkMode: getInitialDarkMode(),
  toggleTheme: () =>
    set((state) => {
      const newValue = !state.darkMode;
      localStorage.setItem("theme", newValue ? "dark" : "light");
      if (newValue) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return { darkMode: newValue };
    }),
  setDarkMode: (value) =>
    set(() => {
      localStorage.setItem("theme", value ? "dark" : "light");
      if (value) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return { darkMode: value };
    }),
}));
