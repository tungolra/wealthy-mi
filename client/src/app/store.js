import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { expenseSlice } from "../features/api/expenseSlice";
import { categorySlice } from "../features/api/categorySlice";
import { assetSlice } from "../features/api/assetSlice";
import { incomeSlice } from "../features/api/incomeSlice";
import { goalSlice } from "../features/api/goalSlice";
import { liabilitySlice } from "../features/api/liabilitySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [expenseSlice.reducerPath]: expenseSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [assetSlice.reducerPath]: assetSlice.reducer,
    [liabilitySlice.reducerPath]: liabilitySlice.reducer,
    [incomeSlice.reducerPath]: incomeSlice.reducer,
    [goalSlice.reducerPath]: goalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(expenseSlice.middleware)
      .concat(categorySlice.middleware)
      .concat(assetSlice.middleware)
      .concat(incomeSlice.middleware)
      .concat(goalSlice.middleware)
      .concat(liabilitySlice.middleware),
});

export default store;
