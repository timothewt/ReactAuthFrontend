import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

const LoadingIcon = () => {
	return (
		<FontAwesomeIcon icon={faCircleNotch} className="animate-spin"/>
	)
}

export default LoadingIcon;
