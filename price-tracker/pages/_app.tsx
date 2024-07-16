import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store, wrapper } from '@/store/store';
import Header from './header';
import { initializeAuth, logout } from '@/store/auth/authSlice';
import Navigation from './navigation';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    dispatch(initializeAuth());

    const handleBeforeUnload = () => {
      dispatch(logout());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch])
  
  useEffect(() => {
    if (!isLoggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  return (
    <>
       <Header />
       <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);