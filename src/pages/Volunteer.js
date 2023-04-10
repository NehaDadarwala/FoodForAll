import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from 'axios';
import * as constantsClass from '../components/apiCalling';

const Volunteer = () => {
    const Swal = require('sweetalert2')

    const defaultValues = {
        "name": "",
        "email": "",
        "date": "",
        "hours": ""
    };

    const apiUrl = constantsClass.apiUrl;
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [error, seterror] = useState("");
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const Volunteer = async ( values, event ) => {
        event.preventDefault();
        let data = JSON.stringify({
            "name": formValues.name,
            "hours": formValues.hours,
            "email": formValues.email,
            "date": formValues.date
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/volunter',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            await axios(config);
            Swal.fire("Volunteered Successfully. Someone will contact you soon.");
            setFormValues(defaultValues);
        } catch (error) {
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
            <form className='register-form' onSubmit={handleSubmit(Volunteer)}>
                <h1>Volunteering Form</h1>
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Name'
                        name='name'
                        variant="outlined"
                        value={formValues.name}
                        {...register("name", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Name is mandatory field"
                            },
                        })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}

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
                <div className='form-control'>
                    <TextField
                        className='textField'
                        label='Number of Hours'
                        type='number'
                        name='hours'
                        variant="outlined"
                        value={formValues.hours}
                        onChange={handleInputChange}
                        {...register("hours", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Hours is mandatory field"
                            },
                            min: {
                                value: 3,
                                message: "Minimum is 3 hours"
                            }
                        })}
                        error={Boolean(errors.hours)}
                        helperText={errors.hours?.message}
                    />
                </div>
                <input type='submit' value='Volunter' className='btn btn-block' />
                <h5 style={{ color: 'red' }}>{error}</h5>
            </form>
        </div>
    )
}

export default Volunteer;