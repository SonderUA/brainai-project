import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/src/shared/store/navSlice";
import articleFormReducer from "@/src/pages/article-generation/model/articleFormSlice";

export const store = configureStore({
	reducer: {
		nav: navReducer,
		articleForm: articleFormReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
