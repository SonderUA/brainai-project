import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectState {
	value: string;
	label: string;
}

interface FormState {
	selects: SelectState[]; // Array for select values
}

const initialState: FormState = {
	selects: [
		{ value: "english", label: "English" },
		{ value: "short", label: "Short" },
		{ value: "formal", label: "Formal" },
		{ value: "local", label: "Local Disk" },
	],
};

const ArticleFormSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		updateSelectOption: (
			state,
			action: PayloadAction<{ index: number; value: SelectState }>
		) => {
			state.selects[action.payload.index] = action.payload.value;
		},
	},
});

export const { updateSelectOption } = ArticleFormSlice.actions;
export default ArticleFormSlice.reducer;
