import useAuth from "./useAuth";
import {axiosPrivate} from "../api/axios";

const useLogout = () => {

	const {setAuth} = useAuth();

	return async () => {
		setAuth({});
		try {
			await axiosPrivate.post('api/v1/auth/logout');
		} catch (err) {
			console.error(err);
		}
	};
}

export default useLogout;
