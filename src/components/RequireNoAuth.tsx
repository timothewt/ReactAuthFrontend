import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireNoAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
            ? <Navigate to="/dashboard" state={{ from: location }} replace />
            : <Outlet />
    );
}

export default RequireNoAuth;
