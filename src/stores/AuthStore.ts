import { createStore } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type AuthState = {
  user: User | null;
  token: string | null;
};

export type AuthActions = {
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  if (typeof window !== "undefined") {
    return {
      user: JSON.parse(localStorage.getItem("user") || "null"),
      token: localStorage.getItem("token") || null,
    };
  }
  return { user: null, token: null };
};

export const defaultAuthState: AuthState = {
  user: null,
  token: null,
};

export const createAuthStore = (initState: AuthState = defaultAuthState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,

    setUser: (user, token) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token ?? "");
      set({ user, token });
    },

    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null });
    },
  }));
};
