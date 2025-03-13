"use client";
import React, { useState, useRef, useEffect } from "react";
import { buttonVariants } from "./Button";
import { AnimatePresence, motion } from "framer-motion";

export interface SelectProps {
	/** Select ID */
	id: string;
	/** Select label */
	label?: string;
	/** Select options */
	options: { value: string; label: string }[];
	/** Select placeholder */
	placeholder?: string;
	/** Selected option */
	selectedOption?: { value: string; label: string } | null;
	/** Change onSelect */
	onSelect: (option: { value: string; label: string }) => void;
}

export const Select = ({
	id,
	label,
	options,
	placeholder = "Select an option",
	selectedOption,
	onSelect,
}: SelectProps) => {
	const selectRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (option: { value: string; label: string }) => {
		onSelect(option);
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			selectRef.current &&
			!selectRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex gap-1.5 flex-col" ref={selectRef}>
			{label !== undefined && (
				<label
					id={`${id}-label`}
					htmlFor={`${id}-button`}
					className="font-medium"
				>
					{label}
				</label>
			)}
			<div className="relative inline-block w-full min-w-52" id={id}>
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-controls={`${id}-listbox`}
					aria-labelledby={`${id}-label ${id}-button`}
					className="bg-white-500 cursor-pointer text-sm input-base"
					id={`${id}-button`}
				>
					<span className="block truncate font-normal text-base">
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<div className="absolute inset-y-0 right-0 flex items-center pr-[1.1875rem] pointer-events-none">
						<img
							src="/arrow-down.svg"
							alt="a dropdown arrow"
							className={`w-4 h-2.5 transition-transform duration-500 ease-in-out ${
								isOpen ? "rotate-180" : ""
							}`}
						/>
					</div>
				</button>

				{isOpen && (
					<div
						id={`${id}-listbox`}
						className="absolute z-10 mt-2.5 w-full p-2.5 ring-1 ring-primary-200 rounded-xl bg-white-500"
						role="listbox"
						aria-labelledby={`${id}-button`}
					>
						<AnimatePresence>
							<motion.ul
								className="rounded-md text-base ring-opacity-5 overflow-auto focus:outline-none sm:text-sm input-scrollbar pr-1.5 max-h-58.5"
								initial={{ height: 0, opacity: 1 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									duration: 0.5,
									ease: "easeInOut",
								}}
							>
								{options.map((option) => (
									<li
										role="option"
										aria-selected={
											selectedOption &&
											selectedOption.value ===
												option.value
												? "true"
												: "false"
										}
										key={option.value}
										onClick={() =>
											handleOptionClick(option)
										}
										className={`cursor-default select-none relative bg-white-500 ${
											selectedOption &&
											selectedOption.value ===
												option.value
												? buttonVariants({
														intent: "secondary",
														size: "medium",
												  })
												: buttonVariants({
														intent: "tertiary",
														size: "medium",
												  })
										}`}
									>
										<span
											className={`block truncate font-medium text-base ${
												selectedOption &&
												selectedOption.value ===
													option.value
													? "bg-text-gradient bg-clip-text text-transparent"
													: ""
											}`}
										>
											{option.label}
										</span>
										{selectedOption &&
											selectedOption.value ===
												option.value && (
												<span className="absolute inset-y-0 right-0 flex items-center pr-3">
													<img
														src="/checkmark.svg"
														alt="a checkmark"
														className="w-5 h-5"
													/>
												</span>
											)}
									</li>
								))}
							</motion.ul>
						</AnimatePresence>
					</div>
				)}
			</div>
		</div>
	);
};
