import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { UserIntrospectType, getIntrospect } from '../api/auth.api';

export type AuthContextType = {
  user: UserIntrospectType | undefined;
  login: (userData: UserIntrospectType) => void;
  logout: () => void;
  setLang: (lang: string) => void;
  setTheme: (theme: string) => void;
  currentTheme: string;
  currentLang: string;
};

export const UserIntrospect = createContext<AuthContextType>({
  user: undefined,
  login(): void {},
  logout(): void {},
  setLang(): void {},
  setTheme(): void {},
  currentTheme: 'nature',
  currentLang: 'en',
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserIntrospectType | undefined>(undefined);
  const [currentTheme, setCurrentTheme] = useState<string>('nature');
  const [currentLang, setCurrentLang] = useState<string>('en');

  const fetchInrospect = useCallback(async () => {
    let data: UserIntrospectType | undefined;
    try {
      data = (await getIntrospect()) as UserIntrospectType;
    } catch (error) {
      console.log('User unauthorized!');
    }
    if (data) {
      setUser(data);
      setCurrentTheme(data.theme);
      setCurrentLang(data.lang);
      console.log(`Introspect fetch ${data.lang}, ${data.theme}`);
    }
  }, []);

  useEffect(() => {
    fetchInrospect();
  }, []);

  const login = (userData: UserIntrospectType) => {
    setUser(userData);
    setCurrentLang(userData.lang);
    setCurrentTheme(userData.theme);
    console.log(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  const setLang = (lang: string) => {
    setCurrentLang(lang);
  };

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      setLang,
      setTheme,
      currentLang,
      currentTheme,
    }),
    [user, login, logout, setLang, setTheme, currentLang, currentTheme],
  );

  return <UserIntrospect.Provider value={authContextValue}>{children}</UserIntrospect.Provider>;
}
