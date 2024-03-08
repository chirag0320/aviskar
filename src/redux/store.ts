import { configureStore } from '@reduxjs/toolkit'
import homepageReducer from './reducers/homepageReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoryReducer from './reducers/categoryReducer'
// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'configDetails',
    'loading',
    'sectionDetails',
    'categoriesList','isLoggedIn','userDetails'], // Reducers you want to persist
}
const persistedHomePageReducer = persistReducer(persistConfig, homepageReducer)
const store = configureStore({
  reducer: {
    homePage: persistedHomePageReducer,
    category : categoryReducer

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
      serializableCheck: false,
    }),
})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { store, persistor }
