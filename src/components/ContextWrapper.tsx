import { Suspense, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './AuthPage';
import { UserIntrospect } from '../context/AuthContext';
import Header from './Header';
import Home from './Home';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/ProfilePage';
import CreateCarlisting from '../pages/CreateCarlisting';
import DeatiledCarPage from '../pages/DetailedCarPage';
import UserListPage from '../pages/UserListPage';
import UpdateCarPage from '../pages/UpdateCarPage';

export default function ContextWrapper() {
  const userInfo = useContext(UserIntrospect);
  const { t } = useTranslation();

  console.log(userInfo);

  return (
    <BrowserRouter>
      <Suspense fallback={<p>{t('loading')}</p>}>
        {!userInfo?.user ? (
          <AuthPage />
        ) : (
          <>
            <Header />
            <main style={{ marginTop: '64px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/carlistings/:id" element={<DeatiledCarPage />} />
                <Route path="/carlistings/:id/update" element={<UpdateCarPage />} />
                <Route path="/create-car-listing" element={<CreateCarlisting />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )}
      </Suspense>
    </BrowserRouter>
  );
}
