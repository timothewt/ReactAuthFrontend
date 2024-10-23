import InfoBox from "./InfoBox";
import ValidationMark from "./ValidationMark";
import React, {ForwardedRef} from "react";

interface FormInputProps {
	label: string;
	id: string;
	type: 'text' | 'email' | 'password';
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	isValid?: boolean;
	isFocused?: boolean;
	infoMessage?: string;
	ref?: React.RefObject<HTMLInputElement>;
	autoComplete?: string;
	className?: string;
}

const FormInput = React.forwardRef(({
		label,
		id,
		type,
		value,
		onChange,
		onFocus,
		onBlur,
		isValid,
		isFocused,
		infoMessage = "",
		autoComplete = 'off',
		className
	}: FormInputProps, ref:ForwardedRef<HTMLInputElement>) => {
	return (
		<div className={className + " relative"}>
			<label htmlFor={id} className="block mb-1">
				{label} <ValidationMark isVisible={(isValid !== undefined) && value.length > 0} isValid={isValid ?? false} />
			</label>
			<input
				ref={ref}
				className="w-full p-2 border border-gray-300 rounded"
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				autoComplete={autoComplete}
				aria-invalid={!isValid}
				aria-describedby={`${id}-note`}
				required
			/>
			<InfoBox
				className="mt-1"
				isVisible={(isFocused ?? false) && value.length > 0 && !isValid}
				message={infoMessage}
			/>
		</div>
	);
});

export default FormInput;
