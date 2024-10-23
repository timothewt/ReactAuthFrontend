import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useEffect, useState} from "react";
import {User} from "../models/User";
import {useLocation, useNavigate} from "react-router-dom";
import LoadingIcon from "./primary/LoadingIcon";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();
	const [user, setUser] = useState<User>();

	const loadingPlaceholder = <LoadingIcon/>;

	useEffect(() => {
		const getAuthenticatedUser = async () => {
			try {
				const response = await axiosPrivate.get('api/v1/users/me');
				return response.data;
			} catch (err: any) {
				console.error(err);
				navigate("/signin", {state: {from: location}, replace: true});
			}
			return null;
		};

		getAuthenticatedUser().then(
			(user: User) => setUser(user)
		);
	}, []);

	return (
		<div className="flex-grow">
			<h1>Dashboard</h1>
			<ul>
				<li>Username: {user?.username ?? loadingPlaceholder}</li>
				<li>Email: {user?.email ?? loadingPlaceholder}</li>
				<li>Role: {user?.role ?? loadingPlaceholder}</li>
			</ul>
		</div>
	);
}

export default Dashboard;
