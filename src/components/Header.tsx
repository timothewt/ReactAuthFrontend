import H2 from "./primary/H2";
import Button from "./primary/Button";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";
import {Link} from "react-router-dom";
import React from "react";

const Header = () => {
	const {auth} = useAuth();

	const handleLogout = useLogout();

	return (
		<header className="flex h-16 border-b border-b-gray-800 box-border items-center p-4 justify-between">
			<Link to={"/"}><H2 text="Application" /></Link>
			{
				auth?.accessToken && <Button onClick={handleLogout} text="Sign Out" className="!w-24"/>
			}
		</header>
	)
}

export default Header;
