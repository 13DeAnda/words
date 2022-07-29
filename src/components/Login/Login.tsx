import React, { useState } from 'react';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './Login.css';

import { IloginCred } from '../../Interfaces/LoginCred';

function Login() {
    const [values, setValues] = useState<IloginCred>({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof IloginCred) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const login = () => {
        console.log('tries to log in', values.username, values.password);
    };
    const newUser = () => {
        console.log('creates new user');
    };

    return (
        <div className="Container">
            <div className="login">
                <TextField
                    label="username"
                    className="loginInput"
                    value={values.username}
                    onChange={handleChange('username')}
                />
                <br />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        label="Password"
                        className="loginInput"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        setValues({ ...values, showPassword: !values.showPassword });
                                    }}
                                    onMouseDown={() => {
                                        setValues({ ...values, showPassword: !values.showPassword });
                                    }}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </div>
            <div className="buttons">
                <Button
                    onClick={login}
                    variant="contained"
                    disabled={!values.password || !values.username}
                    color="secondary"
                >
                    Login
                </Button>
                <br />
                <Button onClick={newUser} color="secondary">
                    New User?
                </Button>
            </div>
        </div>
    );
}

export default Login;
