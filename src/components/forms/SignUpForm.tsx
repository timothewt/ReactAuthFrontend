import React, { useRef, useState, useEffect } from "react";
import axios from '../../api/axios';
import FormInput from "./FormInput";
import Button from "../primary/Button";
import LoadingIcon from "../primary/LoadingIcon";
import ErrorBox from "../primary/ErrorBox";
import H2 from "../primary/H2";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const REGISTER_URL = "/api/v1/auth/register";

const SignUpForm = () => {

	const {setAuth} = useAuth();
	const navigate = useNavigate();

	const usernameRef = useRef<HTMLInputElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [matchPassword, setMatchPassword] = useState('');

	const [usernameFocus, setUsernameFocus] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);
	const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

	const validUsername = USER_REGEX.test(username);
	const validEmail = EMAIL_REGEX.test(email);
	const validPassword = PASSWORD_REGEX.test(password);
	const validMatchPassword = password === matchPassword;

	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (usernameRef.current) {
			usernameRef.current.focus();
		}
	}, []);

	useEffect(() => {
		setErrorMsg('');
	}, [username, email, password, matchPassword]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!USER_REGEX.test(username) || !EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)) {
			setErrorMsg('Invalid input');
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await axios.post(REGISTER_URL,
				JSON.stringify({username: username, email: email, password: password}),
				{
					headers: {'Content-Type': 'application/json'},
					withCredentials: true
				}
			);
			setSuccess(true);
			setUsername("");
			setEmail("");
			setPassword("");
			setMatchPassword("");
			setAuth({username, accessToken: response?.data?.accessToken});
			setTimeout(() => {
				navigate('/dashboard', { replace: true });
			}, 2000);
		} catch (err: any) {
			setErrorMsg(!err?.response
				? 'No Server Response'
				: 'Username or email already exists'
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section className="bg-white text-black w-96 p-4 rounded">
			{success ? (
				<div>
					<H2 text="Sign Up" className="mb-4" />
					<p>
						Your account has been created. Redirecting to <Link to="/dashboard" className="text-blue-600 underline">Dashboard</Link>...
					</p>
				</div>
			): (
				<div>
					{errorMsg && <ErrorBox message={errorMsg} className="mb-1"/>}
					<H2 text="Sign Up" className="mb-4"/>
					<form onSubmit={handleSubmit}>
						<FormInput
							label="Username"
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onFocus={() => setUsernameFocus(true)}
							onBlur={() => setUsernameFocus(false)}
							isValid={validUsername}
							isFocused={usernameFocus}
							infoMessage="Username must be between 4 and 24 characters and start with a letter."
							className="mb-1"
							ref={usernameRef}
						/>

						<FormInput
							label="Email"
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
							isValid={validEmail}
							isFocused={emailFocus}
							infoMessage="Please enter a valid email address."
							className="mb-1"
						/>

						<FormInput
							label="Password"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onFocus={() => setPasswordFocus(true)}
							onBlur={() => setPasswordFocus(false)}
							isValid={validPassword}
							isFocused={passwordFocus}
							infoMessage="Password must be between 8 and 24 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%)."
							className="mb-1"
						/>

						<FormInput
							label="Confirm Password"
							id="match-password"
							type="password"
							value={matchPassword}
							onChange={(e) => setMatchPassword(e.target.value)}
							onFocus={() => setMatchPasswordFocus(true)}
							onBlur={() => setMatchPasswordFocus(false)}
							isValid={validMatchPassword}
							isFocused={matchPasswordFocus}
							infoMessage="Passwords must match."
							className="mb-4"
						/>

						<Button
							onClick={handleSubmit}
							text={isSubmitting ? <LoadingIcon/> : "Sign Up"}
							isDisabled={!validUsername || !validEmail || !validPassword || !validMatchPassword || isSubmitting}
						/>
					</form>
					<p className="mt-1 -mb-1">
						Already have an account? <Link to={"/signin"} className="text-blue-600 underline">Sign in</Link>
					</p>
				</div>
			)}
		</section>
	)
}

export default SignUpForm;
