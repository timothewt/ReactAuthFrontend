import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import RequireNoAuth from "./components/RequireNoAuth";
import PersistentLogin from "./components/PersistentLogin";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/*	Public routes*/}
				<Route path="/" element={<Home />} />
				<Route element={<PersistentLogin />}>
					<Route element={<RequireNoAuth />}>
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
					</Route>

				{/*	Private routes*/}
					<Route element={<RequireAuth />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
				</Route>

				{/* Undefined route*/}
				<Route path="*" element={<section className="flex h-full justify-center items-center font-bold">404 Not Found</section>} />
			</Route>
		</Routes>
    );
}

export default App;
