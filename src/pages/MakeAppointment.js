import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';

const MakeAppointment = () => {
    const Swal = require('sweetalert2')

    const defaultValues = {
        "name": "",
        "bannerID": "",
        "email": "",
        "date": ""
    };

    const apiUrl = constantsClass.apiUrl;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [error, seterror] = useState("");
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const MakeAppointment = async ( values, event ) => {
        event.preventDefault();

        let data = JSON.stringify({
            "name": formValues.name,
            "bannerID": formValues.bannerID,
            "email": formValues.email,
            "date": formValues.date
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/makeappointment',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            await axios(config);
            setFormValues(defaultValues);    
            Swal.fire("Appointment Created Successfully")
        } catch (error) {
            console.log(error);
            setFormValues(defaultValues);    
            seterror(error);
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
            <form className='register-form' onSubmit={handleSubmit(MakeAppointment)}>
                <h1>Make an appointment!</h1>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Name'
                        name='Name'
                        variant="outlined"
                        value={formValues.name}
                        {...register("name", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Name is mandatory field"
                            }
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}

                    />
                </div>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Banner ID'
                        type='text'
                        name='bannerID'
                        variant="outlined"
                        value={formValues.bannerID}
                        onChange={handleInputChange}
                        {...register("bannerID", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Banner ID is mandatory field"
                            }
                        })}
                        error={Boolean(errors.bannerID)}
                        helperText={errors.bannerID?.message}
                    />
                </div>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Email'
                        type='text'
                        name='email'
                        variant="outlined"
                        value={formValues.email}
                        onChange={handleInputChange}
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
                <div className='form-control'>
                    <TextField
                        className='textField'
                        type="date"
                        name='date'
                        variant="outlined"
                        value={formValues.date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: today.toISOString().slice(0, 10),
                            max: nextWeek.toISOString().slice(0, 10),
                        }}
                        {...register("date", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Date is mandatory field"
                            }
                        })}
                        error={Boolean(errors.date)}
                        helperText={errors.date?.message}
                    />
                </div>
                <input type='submit' value='Book Appointment' className='btn btn-block' />
                <h5 style={{ color: 'red' }}>{error}</h5>
            </form>
        </div>
    )
}

export default MakeAppointment;