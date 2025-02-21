"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/app/store";
import { goBack, goForward } from "../store/navSlice";
import { useNavigation } from "../hooks/useNavigation";
import { useRouter, usePathname } from "next/navigation";
import { setSkipNextHistory } from "../model/navSkip";
import { formatBreadcrumb } from "../lib/formatBreadcrumb";
import { NextIcon } from "./icons/NextIcon";

export const Navigation = () => {
	const router = useRouter();
	const pathname = usePathname()!;
	const dispatch = useDispatch<AppDispatch>();
	const nav = useSelector((state: RootState) => state.nav);
	// Custom hook
	useNavigation();

	// Method to navigate back
	const handleBack = () => {
		if (nav.currentIndex > 0) {
			const newIndex = nav.currentIndex - 1;
			dispatch(goBack());
			// Set the flag to skip adding this page to history
			setSkipNextHistory(true);
			router.replace(nav.history[newIndex]);
		}
	};

	// Method to navigate forward
	const handleForward = () => {
		if (nav.currentIndex < nav.history.length - 1) {
			const newIndex = nav.currentIndex + 1;
			dispatch(goForward());
			// Set the flag to skip adding this page to history
			setSkipNextHistory(true);
			router.replace(nav.history[newIndex]);
		}
	};

	return (
		<div className="flex gap-2.5 items-center">
			<button onClick={handleBack} className="text-disabled-100">
				<NextIcon active={nav.currentIndex > 0} rotate />
			</button>
			<button onClick={handleForward} className="c">
				<NextIcon active={nav.currentIndex != nav.history.length - 1} />
			</button>
			<div className="capitalize text-neutral-500 text-sm font-medium flex items-center gap-0.5">
				{formatBreadcrumb(pathname)}
			</div>
		</div>
	);
};
