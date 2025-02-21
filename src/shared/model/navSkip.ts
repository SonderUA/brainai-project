let skipNextHistory = false;

export const setSkipNextHistory = (value: boolean) => {
	skipNextHistory = value;
};

export const shouldSkipNextHistory = () => {
	return skipNextHistory;
};
