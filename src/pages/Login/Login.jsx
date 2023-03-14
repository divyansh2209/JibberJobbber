import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import photo from "../../assests/Validation.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="forms">
      <div className="formContainer">
        <h2>Jibber Jobber</h2>
        <div className="formWrapper">
          <span className="logo">Welcome Back !</span>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Email</p>
              <input type="email" placeholder="email" />
            </div>
            <div>
              <p>Password</p>
              <input type="password" placeholder="password" />
              <div></div>
              <button>Sign in</button>
            </div>

            {err && <span className="error">Something went wrong</span>}
          </form>
        </div>
        <p className="register-link">
          You don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className="form-right">
        <img className="login-photo" src={photo} alt="" />
      </div>
    </div>
  );
};

export default Login;
