/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { persistor, store } from '@/redux/store';
import { Provider } from 'react-redux';
import theme from '@/theme';
import { PersistGate } from 'redux-persist/integration/react';
export const wrapRootElement = ({ element }: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
    </ThemeProvider>
    </PersistGate>
  </Provider>
);
// Wraps every page in a component
// export const wrapPageElement = ({ element, props }:any) => {
//   return <Layout {...props}>{element}</Layout>
// }