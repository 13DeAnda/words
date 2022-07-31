import './Login.css';
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
import { newUser } from '../../services/AuthService';

import { IloginCred } from '../../Interfaces/LoginCred';

function Login() {
    const [values, setValues] = useState<IloginCred>({
        username: '',
        password: '',
        passwordConfirm: '',
        showPassword: false,
    });

    const [loginView, setLoginView] = useState<boolean>(true);

    const handleChange = (prop: keyof IloginCred) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const login = () => {
        console.log('tries to log in', values.username, values.password);
    };

    const register = async () => {
        const response = await newUser(values.username, values.password);
        console.log('got registered', response);
    };

    const confirmPassError =
        values.password.length !== 0 &&
        values.passwordConfirm.length !== 0 &&
        values.password !== values.passwordConfirm;

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
                    <br />
                </FormControl>

                {!loginView ? (
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="verify-password">Confirm</InputLabel>
                        <OutlinedInput
                            error={confirmPassError ? true : false}
                            id="verify-password"
                            label="verify-password"
                            className="loginInput"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.passwordConfirm}
                            onChange={handleChange('passwordConfirm')}
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
                ) : null}
            </div>
            <div className="buttons">
                {loginView ? (
                    <Button
                        onClick={login}
                        variant="contained"
                        disabled={!values.password || !values.username}
                        color="secondary"
                    >
                        Login
                    </Button>
                ) : (
                    <Button
                        onClick={register}
                        variant="contained"
                        disabled={!values.password || !values.username || !values.passwordConfirm || confirmPassError}
                        color="secondary"
                    >
                        Register
                    </Button>
                )}
                <br />
                <Button
                    onClick={() => {
                        setLoginView(!loginView);
                    }}
                    color="secondary"
                >
                    {loginView ? 'New User' : 'Go To Login'}
                </Button>
            </div>
        </div>
    );
}

export default Login;
