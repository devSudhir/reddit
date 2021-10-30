import React, { useState } from 'react'
import styles from './RegistrationModal.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../../Redux/auth/actions";


const SignUp = () => {
  const dispatch = useDispatch();
  const [loginText, setLoginText] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const errMsg = useSelector((state) => state.auth.errMsg);
  
  console.log(errMsg);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (email.length > 1) {
      if ((email.includes("@")) && (email.includes("."))) {
        setLoginText(false);
      }
      else {
        setLoginText(true);
      }
    }
    else {
      setLoginText(false);
    }
  }
  const handleSignup = () => {
    const payload = {
      name,
      email,
      password
    }
    dispatch(registerUser(payload));
  }

  return (
    <>
     {errMsg!=="" ? <p style={{ color: "red", fontSize: "small", marginTop: "-10px" }}>{errMsg}</p> : <></>}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 1.2, width: '100%' },
        }}
        noValidate
        autoComplete="off"

      >
        <div>
          <TextField
            id="filled-search"
            label="EMAIL"
            type="email"
            variant="filled"
            name="email"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={handleEmail}

          />
          {loginText ? <p style={{ color: "red", fontSize: "small", marginTop: "-10px" }}>Please fix your email to continue.</p> : <></>}
          <TextField
            id="filled-search"
            label="CREATE A USERNAME"
            type="search"
            variant="filled"
            onChange={(e)=>{setName(e.target.value)}}
          />
          <TextField
            id="filled-search"
            label="PASSWORD"
            type="password"
            variant="filled"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
      </Box>
      <button onClick={handleSignup} className={styles.btn}>Continue</button>

    </>
  )
}

export default SignUp
