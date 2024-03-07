import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { UserIntrospect } from './AuthContext';
import { updateLangById } from '../api/users.api';

type LanguageContextType = {
  currentLng: string;
  setCurrentLng: (_: string) => void;
};

type LanguageProviderProp = {
  children: ReactNode;
};

export const LanguageContext = createContext<LanguageContextType>({
  currentLng: 'en',
  setCurrentLng(): void {},
});

export function LanguageProvider({ children }: LanguageProviderProp) {
  const { user, currentLang, setLang } = useContext(UserIntrospect);

  const handleLanguageChange = useCallback(
    async (lang: string) => {
      // console.log(lang, currentLng, userInfo?.user?.lang);

      setLang(lang);
      if (currentLang !== lang) {
        if (user) {
          try {
            await updateLangById(user?.userId as number, lang);
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    [currentLang],
  );

  const providerProp = useMemo(() => {
    return {
      currentLng: currentLang,
      setCurrentLng: handleLanguageChange,
    };
  }, [currentLang, handleLanguageChange, i18n]);

  useEffect(() => {
    console.log(user?.lang);
    if (user) {
      // setLang(user?.lang as string);
      i18n.changeLanguage(currentLang);
    }
  }, [user, currentLang, i18n]);

  return (
    <LanguageContext.Provider value={providerProp}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}
