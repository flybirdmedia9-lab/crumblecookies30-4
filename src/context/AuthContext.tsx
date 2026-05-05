import { createContext, useContext, useState, ReactNode } from "react";
import type { User, AdminUser } from "@/types";
import { getItem, setItem, removeItem, KEYS } from "@/lib/storage";
import { defaultAdmin, mockUsers } from "@/data/mockData";
import { apiFetch } from "@/lib/api";

type AuthCtx = {
  user: User | null;
  admin: AdminUser | null;
  login: (phone: string, password: string) => boolean;
  loginAdmin: (email: string, password: string) => boolean;
  register: (name: string, phone: string, password: string, email?: string) => boolean;
  logout: () => void;
  logoutAdmin: () => void;
  updateUser: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getItem<User | null>(KEYS.AUTH_USER, null));
  const [admin, setAdmin] = useState<AdminUser | null>(() => getItem<AdminUser | null>(KEYS.AUTH_ADMIN, null));

  const login = async (identifier: string, password: string): Promise<boolean> => {
    try {
      const res = await apiFetch<{ success?: boolean; user?: User; error?: string }>("/auth.php", {
        method: "POST",
        body: JSON.stringify({ action: "login", identifier, password }),
      });

      if (res.success && res.user) {
        setUser(res.user);
        setItem(KEYS.AUTH_USER, res.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const loginAdmin = (email: string, password: string): boolean => {
    if (email === defaultAdmin.email && password === defaultAdmin.password) {
      setAdmin(defaultAdmin);
      setItem(KEYS.AUTH_ADMIN, defaultAdmin);
      return true;
    }
    return false;
  };

  const register = async (name: string, phone: string, password: string, email?: string): Promise<boolean> => {
    try {
      const res = await apiFetch<{ success?: boolean; user?: User; error?: string }>("/auth.php", {
        method: "POST",
        body: JSON.stringify({ action: "register", name, phone, password, email }),
      });

      if (res.success && res.user) {
        setUser(res.user);
        setItem(KEYS.AUTH_USER, res.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Registration failed", err);
      return false;
    }
  };


  const logout = () => {
    setUser(null);
    removeItem(KEYS.AUTH_USER);
  };

  const logoutAdmin = () => {
    setAdmin(null);
    removeItem(KEYS.AUTH_ADMIN);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    setItem(KEYS.AUTH_USER, updated);
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, loginAdmin, register, logout, logoutAdmin, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
