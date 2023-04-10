import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';
import { TextField } from '@mui/material';

const AdminLogin = () => {
    const navigate = useNavigate();
    const Swal = require('sweetalert2')

    const defaultValues = {
        username: '',
        password: '',
    };

    const apiUrl = constantsClass.apiUrl;

    const [loginError, setLoginError] = useState("");
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const changePassword = async (password, session) => {
        let data = JSON.stringify({
            "email": formValues.email,
            "password": password,
            "session": session
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/newPassword',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        try {
            var response = await axios(config);
            if (response.data.errorMessage) {
                return { "statusCode": "404" }
            }
            return { "statusCode": "404"}
        } catch (error) {
            return { "statusCode": "404" }
        }
    }

    const login = async () => {
        let data = JSON.stringify({
            "email": formValues.email,
            "password": formValues.password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        try {
            var response = await axios(config);
            if (response.data.ChallengeName) {
                Swal.fire({
                    title: 'First time user? Enter your new password',
                    input: 'password',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: 'Change Password',
                    showLoaderOnConfirm: true,
                }).then((result) => {
                    changePassword(result.value, response.data.Session).then(data => {
                        if (data.statusCode === 200) {
                            localStorage.setItem('User', formValues.email);
                            navigate('/');
                        } else {
                            Swal.fire("Error Occurred while changing Password. Try again!");
                        }
                    }).catch(err => {
                        setLoginError("Internal Error, try again later.");
                    });
                })
            } else {
                if (response.data.errorMessage) {
                    setLoginError("Invalid Credentials!");
                } else {
                    localStorage.setItem('User', formValues.email);
                    navigate('/');
                }

            }
        } catch (error) {
            setLoginError("Internal Error, try again later.");
        }

    }

    const handleInputChange = (e) => {
        const nextFormState = {
            ...formValues,
            [e.target.name]: e.target.value,
        };
        setFormValues(nextFormState);
    };


    return (
        <div className='container'>
            <form className='register-form' onSubmit={handleSubmit(login)}>
                <h1>Authenticate Yourself!</h1>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Email'
                        name='email'
                        variant="outlined"
                        value={formValues.email}
                        {...register("email", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Username is mandatory field"
                            },
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                                message: "Username invalid format"
                            }
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}

                    />
                </div>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Password'
                        type='password'
                        name='password'
                        variant="outlined"
                        value={formValues.password}
                        onChange={handleInputChange}
                        {...register("password", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Password is mandatory field"
                            }
                        })}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                </div>
                <input type='submit' value='Login' className='btn btn-block' />
                <h5 style={{ color: 'red' }}>{loginError}</h5>
            </form>
        </div>
    )
}

export default AdminLogin;