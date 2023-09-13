import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./expense/expense-slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middlewares/logger-middleware";

// 1 combine the reducers into a single reducer
const rootReducer = combineReducers({
  EXPENSE: expenseSlice.reducer,
});

// 2 create a basic configuration to tell redux to use the local storage
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// 3 Persist the reducer

const persistedReducers = persistReducer(persistConfig, rootReducer);

// 4 Send the persisted data to the store
const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleware.middleware), //8
});

// 5 Create a persisted version of the store
const persistor = persistStore(store);

// 6 Export the persisted version of the store

// 7 Use the PersistGate component to give your app access to the persisted store

// 8 Tell Redux to ignore all the actions sent by redux-persist

export { store, persistor }; //6
