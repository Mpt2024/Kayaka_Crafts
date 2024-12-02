import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignup = () => {
  const [UserNameError, setUserNameError] = useState('')
  const [UserEmailError, setUserEmailError] = useState('')
  const [UserPasswordError, setUserPasswordError] = useState('')


  const [state, setState] = useState("Login");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;



  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ""
  })
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const login = async (e) => {
    e.preventDefault(); // Prevents the form's default submission behavior
    if (!emailRegex.test(formData.email) && state === 'Login') {
      setUserEmailError('Please enter the valid email');
      return; // Stop execution if validation fails
    } else {
      setUserEmailError(''); // Clear username error
    }
    if (!passwordRegex.test(formData.password) && state === 'Login') {
      setUserPasswordError('Please enter the valid password');
      return; // Stop execution if validation fails
    } else {
      setUserPasswordError(''); // Clear username error
    }

    console.log('login page function exicuted', formData);
    let responsData;
    await fetch('http://localhost:4000/login', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData),

    }).then((response) => response.json()).then((data) => responsData = data)
    if (responsData.success) {
      localStorage.setItem('auth-token', responsData.token);
      window.location.replace('/');

    }
    else {
      alert(responsData.errors);
    }


  }
  const signup = async (e) => {
    e.preventDefault(); // Prevents the form's default submission behavior

    if (formData.username === '' && state === 'Sign Up') {
      setUserNameError('Please enter the name');
      return; // Stop execution if validation fails
    } else {
      setUserNameError(''); // Clear username error
    }
    if (!emailRegex.test(formData.email) && state === 'Sign Up') {
      setUserEmailError('Please enter the valid email');
      return; // Stop execution if validation fails
    } else {
      setUserEmailError(''); // Clear username error
    }
    if (!passwordRegex.test(formData.password) && state === 'Sign Up') {
      setUserPasswordError('Please enter the valid password');
      return; // Stop execution if validation fails
    } else {
      setUserPasswordError(''); // Clear username error
    }

    console.log('Sign up page function executed', formData);

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responsData = await response.json();

      if (responsData.success) {
        localStorage.setItem('auth-token', responsData.token);
        window.location.replace('/loginSignUp');
      } else {
        alert(responsData.errors);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('An error occurred. Please try again.');
    }
  };


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{ state }</h1>
        <div className="loginsignup-fields">
          { state === 'Sign Up' ? <input name='username' value={ formData.username } onChange={ changeHandler } type="text" placeholder='Your Name' /> : <></> }
          { UserNameError ? <p style={ { color: 'red' } }>{ UserNameError }</p> : <></> }
          <input name='email' value={ formData.email } onChange={ changeHandler } type="email" placeholder='Email Address' />
          { UserEmailError ? <p style={ { color: 'red' } }>{ UserEmailError }</p> : <></> }
          <input name='password' value={ formData.password } onChange={ changeHandler } type="password" placeholder='Password' />
          { UserPasswordError ? <p style={ { color: 'red' } }>{ UserPasswordError }</p> : <></> }
        </div>
        <button onClick={ (e) => { state === 'Login' ? login(e) : signup(e) } }>Continue</button>
        { state === 'Sign Up' ?
          <p className="loginsignup-login">Already have an account? <span onClick={ () => { setState('Login') } }>Login here</span></p> :
          <p className="loginsignup-login">Create an account? <span onClick={ () => { setState('Sign Up') } }>Click here</span></p> }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;