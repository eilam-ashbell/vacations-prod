import "./Register.css";

function Register(): JSX.Element {
    return (
        <div className="Register">
            <form>
                <div className="input-label-wrapper">
                    <label htmlFor="firstName">First name</label>
                    <input type={"text"} id="firstName"/>
                    <span className="hint"></span>
                </div>
                <div className="input-label-wrapper">
                    <label htmlFor="lastName">Last name</label>
                    <input type={"text"} id="lastName"/>
                    <span className="hint"></span>
                </div>
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

export default Register;
