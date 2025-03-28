'use client';
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../stylesheet/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, setToken } = useContext(UserContext);

  function handleSubmit(ev) {
    ev.preventDefault();
    const data = {
      username,
      password
    }

    axios.post('https://reqres.in/api/login', data).then(Response => {
      const token = Response.data.token;
      setUserInfo(Response.data);
      setToken(token)
      setRedirect(true);
      console.log(token);
    })
  }

  if (redirect) {
    return <Navigate to={'list'} />
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className='email-label'>Your email</label>
          <input type='email' className='email' value={username} onChange={ev => setUsername(ev.target.value)} placeholder='Email address' />
        </div>
        <div>
          <label htmlFor="password" className="password-label">Password</label>
          <input type="password" name="password" id="password" className='password' placeholder="Password" required="" value={password} onChange={ev => setPassword(ev.target.value)} />
        </div>
        <button type="submit" className='sign'><span>Login</span></button>
      </form>
    </>
  )


}

export default Login