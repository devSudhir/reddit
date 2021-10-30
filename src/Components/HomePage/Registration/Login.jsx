import React, { useState } from 'react'
import styles from './RegistrationModal.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../Redux/auth/actions';

const Login = () => {
  const dispatch = useDispatch();
  const [loginText, setLoginText] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginText = () => {
    if (username.length > 0 && username.length < 3) {
      setLoginText(true);
    }
    else {
      setLoginText(false);
    }
  }

  const handleLogin = () => {
    const payload = {
      email: username,
      password
    }
    dispatch(loginUser(payload));
  }
  return (
    <>

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
            type="search"
            variant="filled"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

          />
          {loginText ? <p style={{ color: "red", fontSize: "small", marginTop: "-10px" }}>Username must be between 3 and 20 characters</p> : <></>}
          <TextField
            id="filled-search"
            label="PASSWORD"
            type="password"
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            onClick={handleLoginText}

          />
        </div>
      </Box>
      <button onClick={handleLogin} className={styles.btn}>Log In</button>

      <div className={styles.afterBtnText1}>
        <span>Forgot your username or password ?</span>
      </div>
    </>
  )
}

export default Login;
