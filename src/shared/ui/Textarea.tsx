import { cn } from "@/src/shared/lib/cn";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	/** Textarea id */
	id: string;
	/** Textarea name */
	name: string;
	/** Additional styling */
	className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
	return (
		<textarea
			className={cn("input-base resize-none bg-weak-100", className)}
			data-testid={props.id}
			{...props}
		></textarea>
	);
};
