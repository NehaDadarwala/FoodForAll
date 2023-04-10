import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { TextareaAutosize } from '@mui/material';
import * as constantsClass from '../components/apiCalling';

const SendNotifications = () => {
    const Swal = require('sweetalert2')
    const defaultValues = {
        "message": ""
    };

    const apiUrl = constantsClass.apiUrl;

    const [loginError, setLoginError] = useState("");
    const [formValues, setFormValues] = useState(defaultValues)
    const { register, handleSubmit } = useForm();

    const SendNotifications = async ( values, event ) => {
        event.preventDefault();

        let data = JSON.stringify({
            "message": formValues.message,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl + '/sendnotifications',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            await axios(config);
            setFormValues(defaultValues)
            Swal.fire("Notification sent successfully to all!")
        } catch (error) {
            console.log(error);
            setLoginError(error);
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
            <form className='register-form' onSubmit={handleSubmit(SendNotifications)}>
                <h1>Publish to All Users</h1>
                <div className='form-control'>
                    <TextareaAutosize
                        className='textArea'
                        minRows={10}
                        size="lg"
                        placeholder='Messsage'
                        variant="outlined"
                        value={formValues.message}
                        style = {{
                            width: "90%",
                            borderRadius: "7px",
                            fontSize: '120%'
                        }}
                        {...register("message", {
                            onChange: (e) => { handleInputChange(e) },
                            required: {
                                value: true,
                                message: "Message is mandatory field"
                            }
                        })}
                    />
                </div>
                <input type='submit' value='Publish message' className='btn btn-block' />
                <h5 style={{ color: 'red' }}>{loginError}</h5>
            </form>
        </div>
    )
}

export default SendNotifications