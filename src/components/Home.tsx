import H1 from "./primary/H1";
import {useNavigate} from "react-router-dom";
import Button from "./primary/Button";
import useAuth from "../hooks/useAuth";

const Home = () => {

    const {auth} = useAuth();

    const signInRoute = "/signin";
    const signUpRoute = "/signup";
    const dashboardRoute = "/dashboard";

    const navigate = useNavigate();

    const navigateTo = (route: string) => {
        navigate(route);
    }

    return (
        <section className="flex flex-col justify-center items-center flex-grow">
            <H1 text="Homepage Title" className="mb-4"/>
            <nav className="flex">
                {
                    auth?.accessToken ?
                        <Button onClick={() => navigateTo(dashboardRoute)} text={"Dashboard"} className="min-w-32 m-2"/>
                        :
                        <>
                            <Button onClick={() => navigateTo(signInRoute)} text={"Sign in"} className="min-w-32 m-2"/>
                            <Button onClick={() => navigateTo(signUpRoute)} text={"Sign up"} className="min-w-32 m-2"/>
                        </>
                }
            </nav>
        </section>
    );
}

export default Home;
