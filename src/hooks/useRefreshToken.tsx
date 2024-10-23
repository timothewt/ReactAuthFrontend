import axios from '../api/axios';
import useAuth from "./useAuth";

const REFRESH_TOKEN_URL = "/api/v1/auth/refresh";

const useRefreshToken = () => {

	const {setAuth} = useAuth();

	return async () => {
		const response = await axios.get(REFRESH_TOKEN_URL, {
			withCredentials: true
		});

		setAuth(prev => ({
			...prev,
			accessToken: response.data.accessToken
		}));

		return response.data.accessToken;
	};
}

export default useRefreshToken;
