import { createContext, useContext, useState, ReactNode } from "react";
import type { User, AdminUser } from "@/types";
import { getItem, setItem, removeItem, KEYS } from "@/lib/storage";
import { defaultAdmin, mockUsers } from "@/data/mockData";

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

  const login = (identifier: string, _password: string): boolean => {
    const users = getItem<User[]>(KEYS.USERS, mockUsers);
    const found = users.find((u) => u.phone === identifier || u.email === identifier);
    if (found) {
      setUser(found);
      setItem(KEYS.AUTH_USER, found);
      return true;
    }
    // Auto-create user for demo if identifier looks like a phone number
    if (/^\d{10}$/.test(identifier)) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: `User ${identifier.slice(-4)}`,
        phone: identifier,
        createdAt: new Date().toISOString(),
        isBlocked: false,
        addresses: [],
        wishlist: [],
      };
      setUser(newUser);
      setItem(KEYS.AUTH_USER, newUser);
      setItem(KEYS.USERS, [...users, newUser]);
      return true;
    }
    return false;
  };


  const loginAdmin = (email: string, password: string): boolean => {
    if (email === defaultAdmin.email && password === defaultAdmin.password) {
      setAdmin(defaultAdmin);
      setItem(KEYS.AUTH_ADMIN, defaultAdmin);
      return true;
    }
    return false;
  };

  const register = (name: string, phone: string, _password: string, email?: string): boolean => {
    const users = getItem<User[]>(KEYS.USERS, mockUsers);
    const exists = users.find((u) => u.phone === phone);
    if (exists) return false;
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
      isBlocked: false,
      addresses: [],
      wishlist: [],
    };
    setUser(newUser);
    setItem(KEYS.AUTH_USER, newUser);
    setItem(KEYS.USERS, [...users, newUser]);
    return true;
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
