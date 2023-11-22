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
                console.error("Registration failed");
            }

        }  catch (error) {
            console.error("Error: ", error)
        }
          
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <div className="flex mb-2">
                    <label className="mr-2 w-20">Name:</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required" }}
                        render={({ field }) => (
                        <input
                            className="bg-background border-b border-accent px-2 leading-tight"
                            {...field}
                            required
                            type="text"/>
                    )}/>
                </div>
                <div className="flex mb-2">
                <label className="mr-2 w-20">Email:</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field }) => (
                    <input
                        className="bg-background border-b border-accent px-2 leading-tight"
                        {...field}
                        required
                        type="text"
                    />)}/>
                </div>
                <div className="flex mb-2">
                <label className="mr-2 w-20">Password:</label>
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                    <input
                        className="bg-background border-b border-accent px-2 leading-tight"
                        {...field}
                        type="text"
                        required/>)}/>
                </div>
                <div className="flex mb-2">
                <label className="mr-2 w-20">Avatar:</label>
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                    <input
                        className="bg-background border-b border-accent px-2 leading-tight"
                        {...field}
                        type="url"/>)}/>
                </div>
                <div className="flex mb-2">
                <label className="mr-2 w-20">Venue Manager:</label>
                <Controller
                    name="venueManager"
                    control={control}
                    render={({ field }) => (
                    <input
                        className="bg-background border-b border-accent px-2 leading-tight"
                        {...field}
                        type="checkbox"/>)}
                />
                </div>
                <div>
                    <button
                        disabled={isSubmitting}
                        className="bg-cta"
                        type="Submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register;