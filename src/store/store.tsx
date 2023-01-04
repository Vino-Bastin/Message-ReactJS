import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authSlice";
import baseApi from "./apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
