import {Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import LoadingIcon from "./primary/LoadingIcon";

const PersistentLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const {auth, persistentAuth} = useAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				 await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		}
		!auth?.accessToken && persistentAuth ? verifyRefreshToken() : setIsLoading(false);
	}, []);

	return (
		<>
			{
				!persistentAuth
				? <Outlet />
				: isLoading
						?
					<section className="flex justify-center items-center flex-grow">
						<LoadingIcon />
					</section>
						:
					<Outlet />
			}
		</>
	);
}

export default PersistentLogin;
