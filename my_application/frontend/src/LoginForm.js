import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Login successful");
      navigate("/profile", { state: { email } });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
   

<div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
<div className='bg-white p-3 rounded w-25'>
    <h2 className="  justify-center items-center flex">Sign-In</h2>

        <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='Enter Email' name='email'
             value={email}
             onChange={(e) => setEmail(e.target.value)}
                className='form-control rounded-0' />
           
        </div>
        <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' name='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)}
               className='form-control rounded-0' />
           
        </div>
        {/* <button type='submit'  >Log in</button> */}
        <button type="button" className='btn btn-success w-100 rounded-0' onClick={handleLogin}>
          Login
        </button>
        <p>You agree to our terms and Policies</p>
        <Link to="/"  className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Register</Link>
        {/*  */}
</div>
</div>
  );
};

export default LoginForm;
