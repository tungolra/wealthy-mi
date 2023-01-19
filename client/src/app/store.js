import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { expenseSlice } from "../features/api/expenseSlice";
import { categorySlice } from "../features/api/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [expenseSlice.reducerPath]: expenseSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(expenseSlice.middleware)
      .concat(categorySlice.middleware),
});

export default store;
