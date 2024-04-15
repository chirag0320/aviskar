// useRequireLogin.ts
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useAppSelector } from '.';

const useRequireLogin = () => {
  const isLoggedIn = useAppSelector((state) => state.homePage.isLoggedIn);
  const [loadingForCheckingLogin, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  return { isLoggedIn, loadingForCheckingLogin };
};

export default useRequireLogin;
