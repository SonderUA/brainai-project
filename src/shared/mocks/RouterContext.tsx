import React, { createContext } from "react";

export const RouterContext = createContext({
	push: (url: string) => console.log("router.push", url),
	replace: (url: string) => console.log("router.replace", url),
});
