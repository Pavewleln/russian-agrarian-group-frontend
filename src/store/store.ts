import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./user/user.slice";

// Главный store
export const store = configureStore({
    reducer: {
        user: userReducer
    },
    // Подключение devTools
    devTools: process.env.NODE_ENV !== "production"
});
// Типизация главного store
export type RootState = ReturnType<typeof store.getState>;
