import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ErrorBoxProps {
	message: string;
	className: string;
}

const ErrorBox = ({ message, className }: ErrorBoxProps) => {
	return (
		<div
			className={"bg-opacity-65 border border-red-500 bg-red-700 text-white rounded p-1 w-full " + className}
			aria-live={"assertive"}
		>
			<FontAwesomeIcon icon={faExclamationTriangle}/> {message}
		</div>
	)
}

export default ErrorBox;
