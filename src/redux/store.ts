import { configureStore } from "@reduxjs/toolkit";
import booksSliceReducer from "./slices/booksSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        books: booksSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
