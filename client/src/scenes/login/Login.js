import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'state/api';
import { Box, Button, TextField, Typography } from '@mui/material';
import { setUser } from 'state';
import { useDispatch } from 'react-redux';
import { setToken } from 'state/authSlice';

export default function Login() {

    const navigation = useNavigate();
    const [loginUser] = useLoginUserMutation();

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });


    const userHandler = async (e) => {
        const { name, value } = e.target;
        setUserLogin((pre) => ({ ...pre, [name]: value }))
    };

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(userLogin);
            const { data } = response;
            if (data && data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('role', data.role);
                localStorage.setItem('position', data.position);
                dispatch(setUser(data.id));
                dispatch(setToken(data.token));
                navigation('/');
            } else {
                throw new Error('Invalid token received');
            }
        } catch (error) {
            console.log(error);
            alert('Error logging in. Please try again.');
        }
    }

    return (
        <div className='login'>
            <div className="login_container">
                <h3>Please Sign In</h3>
                <div className="wrapper">
                    <Box display='flex' flexDirection='column' gap='1rem'>
                        <Typography display='flex' flexDirection='column'>
                            For User:
                            <small>username: demo@abc.com</small>
                        </Typography>
                        <Typography display='flex' flexDirection='column'>
                            For Admin:
                            <small>username: demo@abc.com</small>
                        </Typography>
                        <Typography display='flex' flexDirection='column'>
                            For Super User:
                            <small>username: demo@abc.com</small>
                        </Typography>
                        <small>password: 123456</small>
                    </Box>
                    <hr />
                    <form onSubmit={handleLogin}>
                        <Box sx={{ m: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <TextField
                                required
                                label="Email"
                                name="email"
                                type="email"
                                value={userLogin.email}
                                onChange={userHandler}
                                fullWidth
                            />
                            <TextField
                                required
                                label="Password"
                                name="password"
                                type="password"
                                value={userLogin.password}
                                onChange={userHandler}
                                fullWidth
                            />
                            <Button fullWidth type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    )
}
