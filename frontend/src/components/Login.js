import React, { useState } from 'react';
import loginService from '../services/loginService';
import setToken from '../adminPanel/services/calendar';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const loginHandler = async (event) => {
		event.preventDefault();
		console.log('login');
		const user = await loginService.login({
			username: username,
			password: password,
		});
		// eslint-disable-next-line no-undef
		window.localStorage.setItem(process.env.REACT_APP_SECRET, JSON.stringify(user));
		setToken.setToken(user.token);
	};

	return (
		<div>
			<h1>login</h1>
			<div>
				<form onSubmit={loginHandler}>
					<input
						type="text"
						value={username}
						onChange={({target}) => setUsername(target.value)}
					/>
					<input
						type="password"
						value={password}
						onChange={({target}) => setPassword(target.value)}
					/>
					<button type="submit">login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
