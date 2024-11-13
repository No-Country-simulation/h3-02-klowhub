'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { checkAuth } from '../service/checkauth.service';

const AuthContext = createContext<null | any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verifyAuth() {
      const user = await checkAuth();
      setUser(user);
    }

    verifyAuth();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
