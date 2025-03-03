"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type ThemeStore,
  createThemeStore,
  initThemeStore,
} from "@/stores/ThemeStore";

export type ThemeStoreApi = ReturnType<typeof createThemeStore>;

export const ThemeStoreContext = createContext<ThemeStoreApi | undefined>(
  undefined
);

export interface ThemeStoreProviderProps {
  children: ReactNode;
}

export const ThemeStoreProvider = ({ children }: ThemeStoreProviderProps) => {
  const storeRef = useRef<ThemeStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createThemeStore(initThemeStore());
  }

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      {children}
    </ThemeStoreContext.Provider>
  );
};

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = useContext(ThemeStoreContext);

  if (!themeStoreContext) {
    throw new Error(`useThemeStore must be used within ThemeStoreProvider`);
  }

  return useStore(themeStoreContext, selector);
};
