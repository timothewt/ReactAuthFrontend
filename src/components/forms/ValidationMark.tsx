import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ValidationMarkProps {
	isVisible: boolean;
	isValid: boolean;
}

const ValidationMark = ({ isVisible, isValid }: ValidationMarkProps) => {
	return (
		<span className={(!isVisible && "hidden") + ""}>
			<FontAwesomeIcon icon={isValid ? faCheck : faTimes} className={isValid ? "text-green-700" : "text-red-700"}/>
		</span>
	);
};

export default ValidationMark;
