import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';

const DeleteAppointment = () => {
    const Swal = require('sweetalert2')
    const defaultValues = {
        email: '',
        otp: ''
    };

    const apiUrl = constantsClass.apiUrl;

    const [deleteAppointmentError, setdeleteAppointmentError] = useState("");
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [otpSent, setotpSent] = useState(false);

    const deleteAppointment = async () => {
        let data = JSON.stringify({
            "email": formValues.email,
            "otp": formValues.otp,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/deleteappointment',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            var response = await axios(config);
            console.log(JSON.stringify(response.data));
            if (response.data.statusCode === 200) {
                if(response.data.message === "OTP Sent"){
                    setotpSent(true)
                }else{
                    setotpSent(false)
                    setFormValues(defaultValues);
                }
                Swal.fire(response.data.message)
            } else {
                setdeleteAppointmentError(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setFormValues(defaultValues);
            setdeleteAppointmentError(error);
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
            <form className='register-form' onSubmit={handleSubmit(deleteAppointment)}>
                <h1>Want to delete the appointment?</h1>
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
                                message: "Email is mandatory field"
                            }
                        })}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                </div>
                {otpSent ?
                    <div className='form-control'>
                        <TextField
                            className='textField'
                            label='OTP'
                            name='otp'
                            variant="outlined"
                            value={formValues.otp}
                            {...register("otp", {
                                onChange: (e) => { handleInputChange(e) },
                                required: {
                                    value: true,
                                    message: "Email is mandatory field"
                                }
                            })}
                            error={Boolean(errors.otp)}
                            helperText={errors.otp?.message}
                        />
                    </div>
                    : <div></div>}
                <input type='submit' value='Delete it!' className='btn btn-block' />
                <h5 style={{ color: 'red' }}>{deleteAppointmentError}</h5>
            </form>
        </div>
    )
}

export default DeleteAppointment;

