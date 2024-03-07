import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * Komponens amit kirajzolunk, ha más útvonal
 * nem található a kérésünkre
 */
export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // átirányítás a főoldalra 5 másodperc után
  useEffect(() => {
    // időzítő beállítása 5 másodpercre
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    // ha a komponens törlődik mielőtt az átirányítás
    // megtörént, lezárjuk az időzítőt
    return () => clearTimeout(timeout);
  }, [navigate]);

  return <h3 className="error">{t('error.page_not_found')}</h3>;
}
