"use client";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "@/src/app/store";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider store={store}>{children}</Provider>;
};

export const SessionProviders = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <SessionProvider>{children}</SessionProvider>;
};
