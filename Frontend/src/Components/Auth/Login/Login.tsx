import "./Login.css";

function Login(): JSX.Element {
    return (
        <div className="Login">
			<form>
                <div className="input-label-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type={"text"} id="username"/>
                    <span className="hint"></span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type={"password"} id="password"/>
                    <span className="hint"></span>
                </div>
            </form>
        </div>
    );
}

export default Login;
