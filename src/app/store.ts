import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/src/shared/store/navSlice";

export const store = configureStore({
	reducer: {
		nav: navReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;