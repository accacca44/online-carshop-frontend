import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserIntrospect } from '../context/AuthContext';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext, getTheme } from '../context/ThemeContext';
import { elegant, nature, tech } from '../theme/themes';

export default function Header() {
  const userInfo = useContext(UserIntrospect);
  const { t, i18n } = useTranslation();
  const { currentLng, setCurrentLng } = useContext(LanguageContext);
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const isAdmin = userInfo?.user?.role === 'Admin';

  const handleLanguageChange = useCallback(
    (lang: string) => () => {
      i18n.changeLanguage(lang);
      setCurrentLng(lang);
    },
    [i18n, currentLng],
  );

  const handleThemeChange = useCallback(
    (theme: string) => () => {
      setCurrentTheme(getTheme(theme));
    },
    [currentTheme],
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          <Typography variant="h6">{t('nav.browse')}</Typography>
        </Button>
        {isAdmin && (
          <Button color="inherit" component={Link} to="/users">
            <Typography variant="h6">{t('nav.users')}</Typography>
          </Button>
        )}

        <div style={{ marginLeft: 'auto' }}>
          <Button color="inherit" onClick={handleThemeChange('nature')} disabled={currentTheme === nature}>
            Nature
          </Button>
          <Button color="inherit" onClick={handleThemeChange('tech')} disabled={currentTheme === tech}>
            Tech
          </Button>
          <Button color="inherit" onClick={handleThemeChange('elegant')} disabled={currentTheme === elegant}>
            Elegate
          </Button>
          <Button color="inherit" onClick={handleLanguageChange('en')} disabled={currentLng === 'en'}>
            EN
          </Button>
          <Button color="inherit" onClick={handleLanguageChange('hu')} disabled={currentLng === 'hu'}>
            HU
          </Button>
          <Button color="inherit" onClick={handleLanguageChange('ro')} disabled={currentLng === 'ro'}>
            RO
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            <Typography variant="h5">{userInfo?.user?.username}</Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
