import React from "react";
import Button from 'react-bootstrap/Button';

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <div className="loginHeader">
          {hasAccount ? (
            <>
              <h1>Welcome Back!</h1>
              <h2>Login Here</h2>
            </>
          ) : (
              <>
                <h1>New Here?</h1>
                <h2>Sign-up Now!</h2>
              </>
            )}
        </div>
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <Button variant="light" onClick={handleLogin}>Sign In</Button>
              <p>
                Don't Have an account ?
              <span onClick={() => setHasAccount(!hasAccount)}> Sign Up</span>
              </p>
            </>
          ) : (
              <>
                <Button variant="light" onClick={handleSignup}>Sign Up</Button>
                <p>
                  Have an account ?
                  <span onClick={() => setHasAccount(!hasAccount)}> Sign In</span>
                </p>
              </>
            )}
        </div>
      </div>
    </section >
  );
}


export default Login;