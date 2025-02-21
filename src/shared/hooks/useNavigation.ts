import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPageToHistory } from "../store/navSlice";
import { AppDispatch } from "@/src/app/store";
import { usePathname } from "next/navigation";
import { shouldSkipNextHistory, setSkipNextHistory } from "../model/navSkip";

export const useNavigation = () => {
	const dispatch = useDispatch<AppDispatch>();
	const pathname = usePathname()!;

	useEffect(() => {
		if (shouldSkipNextHistory()) {
			// Reset the flag and skip adding the page to history.
			setSkipNextHistory(false);
			return;
		}
		// For a "new" navigation, add the page to history.
		dispatch(addPageToHistory(pathname));
	}, [pathname, dispatch]);
};
