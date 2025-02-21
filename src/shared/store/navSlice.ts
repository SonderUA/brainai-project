import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavState {
	history: string[]; // Store visited pages as a history array
	currentIndex: number; // Keep track of the current page in history
}

const initialState: NavState = {
	history: [],
	currentIndex: -1,
};

const navSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		addPageToHistory: (state, action: PayloadAction<string>) => {
			// Ensure we are adding a new page to the history and trimming forward pages if we are in the middle
			if (state.currentIndex < state.history.length - 1) {
				state.history = state.history.slice(0, state.currentIndex + 1);
			}
			state.history.push(action.payload);
			state.currentIndex++;
		},
		goBack: (state) => {
			if (state.currentIndex > 0) state.currentIndex--;
		},
		goForward: (state) => {
			if (state.currentIndex < state.history.length - 1)
				state.currentIndex++;
		},
	},
});

export const { addPageToHistory, goBack, goForward } = navSlice.actions;
export default navSlice.reducer;
