"use client";
import { signIn } from "next-auth/react";
import { capitalize } from "@/src/shared/lib";

interface AuthButtonProps {
	/** Auth Provider */
	provider: "github" | "google";
	/** Button intent */
	intent?: "primary" | "secondary";
	/** Is there only an icon? */
	icon?: boolean;
	/** Button icon svg */
	svg: React.ReactElement;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
	provider,
	intent = "primary",
	icon = false,
	svg,
}) => {
	return (
		<button
			className={`flex gap-2.5 py-2.5 px-7 rounded-[0.625rem] items-center ${
				intent === "primary"
					? "bg-primary-gradient text-white-500"
					: "bg-white-500 gradient-border text-neutral-300"
			}`}
			onClick={() => signIn(provider, { redirectTo: "/" })}
		>
			{svg}
			{!icon && (
				<p className="text-sm font-medium">
					Sign in with {capitalize(provider)}
				</p>
			)}
		</button>
	);
};
