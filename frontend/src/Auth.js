import React, { useState } from "react"

export default function AuthForm(props) {
    const [authMode, setAuthMode] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loginFailed, setLoginFailed] = useState(false)

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: email, password: password }),
        };

        const authEndpoint = authMode === "signin" ? "login" : "signup";
        console.log("FORM SUBMIT")
        fetch(`http://localhost:8080/auth/${authEndpoint}`, requestOptions)
            .then((data) => {
                let statusCode = data.status;
                if(statusCode == 200) {
                    //console.log("Success")
                    setLoginFailed(false)
                } else {
                    //console.log("NO")
                    setLoginFailed(true)
                }
            })
    };

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form"  onSubmit={handleFormSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        {loginFailed && <div className="alert alert-danger" role="alert">
                            Die Login-Daten sind nicht korrekt.
                        </div>}
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }


    return (
        <div className="Auth-form-container">
            <form className="Auth-form"  onSubmit={handleFormSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}