import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './reducers/homepageReducer'
import blogReducer from './reducers/blogReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoryReducer from './reducers/categoryReducer'
import contactUsPageReducer from './reducers/contactUs'
import newsReducer from './reducers/newsReducer'
import calculatorsReducer from './reducers/calculatorsReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'
import compareProductsReducer from './reducers/compareProductsReducer'
import wishListReducer from './reducers/wishListReducer'
// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'configDetails',
    'userDetails',
    'loading',
    'sectionDetails',
    'categoriesList', 'isLoggedIn', 'userDetails', 'blogList', 'newsList', 'calculators','recentlyViewedProducts','productIds'], // Reducers you want to persist
}
// const persistedHomePageReducer = persistReducer(persistConfig, homepageReducer)
// const persistedblogReducer = persistReducer(persistConfig, blogReducer)
// const persistednewsReducer = persistReducer(persistConfig, newsReducer)
// const persistedCalculator = persistReducer(persistConfig, calculatorsReducer)

const store = configureStore({
  reducer: {
    homePage: persistReducer(persistConfig, homepageReducer),
    category: categoryReducer,
    contactUs: contactUsPageReducer,
    shoppingCart: shoppingCartReducer,
    blogPage: persistReducer(persistConfig, blogReducer),
    newsPage: persistReducer(persistConfig, newsReducer),
    calculators: persistReducer(persistConfig, calculatorsReducer),
    compareProducts: persistReducer(persistConfig, compareProductsReducer),
    wishList : wishListReducer


    // profile: persistedProfileReducer,
    // contributor: persistedContributorReducer,
    // company: companyReducer,
    // guidelines: guidelineReducer,
    // initiative: initiativeReducer,
    // campaign: campaignReducer,
    // searchVideo: searchVideoReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store, persistor }
