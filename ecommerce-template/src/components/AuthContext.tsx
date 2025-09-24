import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    if (email === "admin@styleshop.com" && password === "admin123") {
      setUser({
        id: "1",
        email: email,
        name: "Admin User",
        isAdmin: true
      });
      return true;
    } else if (email.includes("@") && password.length >= 6) {
      setUser({
        id: "2",
        email: email,
        name: email.split("@")[0],
        isAdmin: false
      });
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    if (email.includes("@") && password.length >= 6 && name.length >= 2) {
      setUser({
        id: Date.now().toString(),
        email: email,
        name: name,
        isAdmin: false
      });
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

//corregir