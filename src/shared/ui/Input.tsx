import { cn } from "@/src/shared/lib/cn";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	/** Input id */
	id: string;
	/** Input name */
	name: string;
	/** Input type */
	type: string;
	/** Input label text */
	label?: string;
	/** Input link text */
	linkLabel?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	linkLabel,
	className,
	...props
}) => {
	return (
		<div className="flex gap-1.5 flex-col w-full">
			{label !== undefined && (
				<label htmlFor={props.id} className="font-medium">
					{label}
				</label>
			)}
			<input
				className={cn("input-base", className)}
				data-testid={props.id}
				autoComplete="off"
				{...props}
			/>
		</div>
	);
};
