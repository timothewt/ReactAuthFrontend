import React, { useRef, useState, useEffect } from 'react';
import axios from "../../api/axios";
import ErrorBox from "../primary/ErrorBox";
import H2 from "../primary/H2";
import FormInput from "./FormInput";
import Button from "../primary/Button";
import LoadingIcon from "../primary/LoadingIcon";
import useAuth  from "../../hooks/useAuth";
import {Link} from "react-router-dom";
import Checkbox from "../primary/Checkbox";

const LOGIN_URL = "/api/v1/auth/authenticate";

const SignInForm = () => {

	const {setAuth, persistentAuth, setPersistentAuth} = useAuth();

	const usernameRef = useRef<HTMLInputElement | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (usernameRef.current)
			usernameRef.current.focus();
	}, []);

	useEffect(() => {
		setErrorMessage('');
	}, [username, password]);

	const togglePersistentAuth = () => {
		setPersistentAuth(prev => !prev);
	}

	useEffect(() => {
		localStorage.setItem('persistentAuth', persistentAuth.toString());
	}, [persistentAuth]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);
		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({username: username, password: password}),
				{
					headers: {'Content-Type': 'application/json'},
					withCredentials: true
				}
			);
			const accessToken = response?.data?.accessToken;
			setAuth({ username, accessToken });
			setUsername('');
			setPassword('');
			// navigate(target, { replace: true });
		} catch (err: any) {
			if (!err?.response) {
				setErrorMessage('No Server Response');
			} else {
				setErrorMessage('Invalid username or email');
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className="bg-white text-black w-96 p-4 rounded">
			{errorMessage && <ErrorBox message={errorMessage} className="mb-1"/>}
			<H2 text="Sign In" className="mb-4" />
			<form>
				<FormInput
					label="Username"
					type="text"
					id="username"
					value={username}
					ref={usernameRef}
					onChange={(e) => setUsername(e.target.value)}
					className="mb-1"
				/>
				<FormInput
					label="Password"
					type="password"
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					className="mb-4"
				/>
				<Button
					isDisabled={!username || !password}
					onClick={handleSubmit}
					text={isSubmitting ? <LoadingIcon/> : "Sign In"}
				/>
				<Checkbox label="Stay signed in" checked={persistentAuth} onChange={togglePersistentAuth} className="m-2 ml-0"/>
			</form>
			<p className="">
				Don't have an account? <Link to={"/signup"} className="text-blue-600 underline">Sign up</Link>
			</p>
		</section>
)
}

export default SignInForm;
