import { Theme, ThemeProvider as DefaultThemeProvider } from '@mui/material';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { elegant, nature, tech } from '../theme/themes';
import { UserIntrospect } from './AuthContext';
import { updateThemeById } from '../api/users.api';

type ThemeContextType = {
  currentTheme: Theme;
  setCurrentTheme: (_: Theme) => void;
};

export const getThemeName = (theme: Theme) => {
  if (theme === nature) return 'nature';
  if (theme === tech) return 'tech';
  if (theme === elegant) return 'elegant';
  return 'nature';
};

export const getTheme = (themeName: string) => {
  if (themeName === 'nature') return nature;
  if (themeName === 'tech') return tech;
  if (themeName === 'elegant') return elegant;
  return nature;
};

// Theme context that stores and sets the current theme
export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: nature,
  setCurrentTheme(): void {},
});

// Theme Provider using the default ThemeContext.provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user, currentTheme, setTheme } = useContext(UserIntrospect);
  const [ctheme, setcTheme] = useState<Theme>(nature);

  // On theme change, update the theme and database
  const handleThemeChange = useCallback(
    async (theme: Theme) => {
      const name = getThemeName(theme);
      console.log(`Theme before update  ${name}`);
      setTheme(name);
      setcTheme(theme);
      if (name !== currentTheme) {
        if (user) {
          await updateThemeById(user?.userId as number, name);
        }
      }
    },
    [currentTheme],
  );

  const themeProviderProp = useMemo(() => {
    return {
      currentTheme: ctheme,
      setCurrentTheme: handleThemeChange,
    };
  }, [currentTheme, ctheme, handleThemeChange]);

  // When the componenet mount set the users prefered theme from the authContext
  useEffect(() => {
    console.log(currentTheme);
    if (currentTheme) {
      setcTheme(getTheme(currentTheme));
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={themeProviderProp}>
      <DefaultThemeProvider theme={ctheme}>{children}</DefaultThemeProvider>;
    </ThemeContext.Provider>
  );
}
