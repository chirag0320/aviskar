import { navigate } from 'gatsby';
// useUserDetailsFromToken.js
import { ImpersonateSignInAPI } from '@/redux/reducers/homepageReducer';
import { useEffect } from 'react';
import { useAppDispatch } from '.';

const useUserDetailsFromToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      dispatch(ImpersonateSignInAPI({token}) as any);
      navigate('/')
    }
  }, [dispatch]);
};

export default useUserDetailsFromToken;
