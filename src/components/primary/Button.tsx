import {ReactNode} from "react";

interface ButtonProps {
	onClick: (_: any) => any;
	text: string | ReactNode;
	isDisabled?: boolean;
	className?: string;
}

const Button  = ({ onClick, text, isDisabled, className = "" }: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={"w-full p-2 bg-amber-500 text-white rounded hover:bg-amber-600 hover:cursor-pointer active:bg-amber-700 shadow hover:shadow-2xl disabled:hover:bg-amber-500 disabled:cursor-not-allowed duration-200 " + className}
		>
			{text}
		</button>
	)
}

export default Button;
