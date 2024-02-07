// SignupForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

const SignupForm = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        name,
        age,
        dob,
        contact,
      });
      console.log("Signup successful");
      setEmail("");
      setPassword("");
      setName("");
      setAge("");
      setDob("");
      setContact("");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
     <div className='d-flex justify-content-center align-items-center bg-primary vh-90'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className="  flex justify-center items-center">Sign-Up</h2>
                <form >
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name'
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                            className='form-control rounded-0' />
                        
                    </div>
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
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Age</strong></label>
                        <input type="text" placeholder='Enter Age' name='age'
                         value={age}
                         onChange={(e) => setAge(e.target.value)}
                            className='form-control rounded-0' />
                        
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Dob</strong></label>
                        <input type="date" 
                        name="age"
                         value={dob}
                         onChange={(e) => setDob(e.target.value)}
                            className='form-control rounded-0' />
                        
                    </div>
                    
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Contact</strong></label>
                        <input type="text" placeholder='Enter Contact' name='contact'
                         value={contact}
                         onChange={(e) => setContact(e.target.value)}
                            className='form-control rounded-0' />
                        
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0' onClick={handleSignup}>Sign up</button>
                    <p>You agree to our terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                </form>
            </div>
        </div>
    </>
  );
};

export default SignupForm;
