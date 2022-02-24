import { useState } from "react";
import GoogleLogin from "react-google-login";

function LoginViaGoogle() {
	const [loginData, setLoginData] = useState(
		localStorage.getItem("loginData")
		? JSON.parse(localStorage.getItem("loginData")!)
		: null
	);

	const handleFailure = (result: Error) => {
		alert(result);
	};

	const handleLogin = async (googleData: any) => {
		const res = await fetch('/api/auth/login/google', {
			method: "POST",
			body: JSON.stringify({
				token: googleData.tokenId,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setLoginData(data);
		localStorage.setItem("loginData", JSON.stringify(data));
	}

	const handleLogout = () => {
		localStorage.remoteItem("loginData");
		setLoginData(null);
	}

	return (
	<div>
		{
			loginData ? (
				<div>
					<h3> you are logged in as {loginData.email}</h3>
					<button onClick={handleLogout}>Logout</button>
				</div>
			)
			:
			<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
			buttonText="Log in with Google"
			onSuccess={handleLogin}
			onFailure={handleFailure}
			cookiePolicy={"single_host_origin"}
			></GoogleLogin>
		}
		</div>
	)
}

export default LoginViaGoogle;