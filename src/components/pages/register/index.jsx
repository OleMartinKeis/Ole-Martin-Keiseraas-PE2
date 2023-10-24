import React from "react";
import { API_HOST_URL } from "../../storage/constants";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"

const path ="/auth/register"

function Register() {
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            avatar: '',
            venueManager: false,
        }
    });
    const { isSubmitting } = formState;

    const toLogin = useNavigate();

    const handleButtonClick = (event) => {
        event.preventDefault();
        
    }
    const onSubmit = async (data) => {
        try{
            const response = await fetch(`${API_HOST_URL}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toLogin("/login")
            } else {
                console.error('Registration failed');
            }

        }  catch (error) {
            console.error("Error: ", error)
        }
          
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <Controller name="name" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} required type="text" />}/>
                </div>
                <div>
                    <label>Email:</label>
                    <Controller name="email" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} required type="text" />}/>
                </div>
                <div>
                    <label>Password:</label>
                    <Controller name="password" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} type="text" required/>}/>
                </div>
                <div>
                    <label>Avatar:</label>
                    <Controller name="avatar" control={control} render={({ field }) => <input {...field} type="url" />}/>
                </div>
                <div>
                    <label>Do you want to be a VenueManager?</label>
                    <Controller name="venueManager" control={control} render={({ field }) => <input {...field} type="checkbox" />}/>
                </div>
                <div>
                    <button disabled={isSubmitting} className="bg-cta" type="Submit">Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;