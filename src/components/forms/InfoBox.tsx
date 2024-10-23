import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

interface InfoBoxProps {
	className: string;
	isVisible: boolean;
	message: string;
}

const InfoBox = ({ className, isVisible, message }: InfoBoxProps) => {
	return (
		<div className={(isVisible ? "" : "hidden ") + "absolute bg-opacity-75 bg-black text-white rounded p-1 w-full z-20 " + className}>
			<FontAwesomeIcon icon={faInfoCircle}/> {message}
		</div>
	)
}

export default InfoBox;
