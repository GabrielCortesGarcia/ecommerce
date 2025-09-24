import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === "admin@styleshop.com" && password === "admin123") {
      setUser({ id: "1", email, name: "Admin User", isAdmin: true });
      return true;
    } else if (email.includes("@") && password.length >= 6) {
      setUser({ id: "2", email, name: email.split("@")[0], isAdmin: false });
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email.includes("@") && password.length >= 6 && name.length >= 2) {
      setUser({ id: Date.now().toString(), email, name, isAdmin: false });
      return true;
    }
    
    return false;
  };

  const logout = () => setUser(null);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
