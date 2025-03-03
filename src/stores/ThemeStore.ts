import { createStore } from "zustand";

export type ThemeState = {
  sidebarOpen: boolean;
};

export type ThemeActions = {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const initThemeStore = (): ThemeState => {
  return { sidebarOpen: true };
};

export const defaultInitState: ThemeState = {
  sidebarOpen: true,
};

export const createThemeStore = (initState: ThemeState = defaultInitState) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    closeSidebar: () => set((state) => ({ sidebarOpen: false })),
    openSidebar: () => set((state) => ({ sidebarOpen: true })),
  }));
};
