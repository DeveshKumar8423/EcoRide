import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';
import { mockProfiles, setCurrentUser, getCurrentUser } from '../services/mockData';

interface AuthContextType {
  user: Profile | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string) => {
    const foundUser = mockProfiles.find(p => p.email === email);
    if (foundUser) {
      setUser(foundUser);
      setCurrentUser(foundUser);
    } else {
      throw new Error('User not found');
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
