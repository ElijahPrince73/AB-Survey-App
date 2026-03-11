import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
}


// if (jwt === undefined)  show loading spinner
// if (jwt === null)       redirect to login
// if (jwt)                redirect to survey

type AuthContextType = {
  jwt: string | null | undefined;
  user: User | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<User | null>(null);

  // On app load, check for existing token
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setJwt(token);
      } catch (error) {
        setJwt(null);
      }
    }
    loadToken()
  }, [])


  const login = async (token: string, userData: User) => {
    await SecureStore.setItemAsync("token", token);
    setJwt(token);
    setUser(userData);
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('token')
    setJwt(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ jwt, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
