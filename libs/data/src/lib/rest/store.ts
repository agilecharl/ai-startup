import { Storage } from '@plasmohq/storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import { localStorage as originalLocalStorage } from 'redux-persist-webextension-storage';
import settingsSlice from './settings-slice';

const localStorage = {
  ...originalLocalStorage,
  getAllKeys: () => {
    return Promise.resolve(Object.keys(originalLocalStorage));
  },
};

const rootReducer = settingsSlice;

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//export const persistor = persistStore(store);

new Storage().watch({
  [`persist:${persistConfig.key}`]: () => {
    //persistor.persist();
  },
});
