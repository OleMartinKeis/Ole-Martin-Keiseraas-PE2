import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { API_HOST_URL } from "../../storage/constants";
import { useAuth } from "../../storage/authentication";

const path = "/auth/login"

function Login() {
    const { setIsAuthenticated } = useAuth();
    
    const toHome = useNavigate();
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });
    const { isSubmitting } = formState;

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
                const responseData = await response.json();
                const user = {
                    name: responseData.name,
                    email: responseData.email,
                    avatar: responseData.avatar,
                    venueManager: responseData.venueManager,
                };
                
                localStorage.setItem("token", responseData.accessToken)
                localStorage.setItem("user", JSON.stringify(user));
                setIsAuthenticated(true);
                toHome("/");
            } else {
                console.error("Login failed");
            }

        }  catch (error) {
            console.error("Error: ", error)
        }
          
    }

    return (
        <div className="flex flex-col justify-center items-center content-center h-screen">
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row mb-8">
                    <div className="flex mb-2">
                        <label className="pr-2">Email:</label>
                        <Controller name="email" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input className="bg-background border-b border-accent pr-4 w-full leading-tight" {...field} required type="text" />}/>
                    </div>
                    <div className="flex mb-2">
                        <label className="ml-2 w-20">Password:</label>
                        <Controller name="password" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} className="bg-background border-b border-accent px-2 leading-tight" type="text" required/>}/>
                    </div>
                    <div>
                        <button disabled={isSubmitting}  className="ml-4 w-full bg-cta p-1 rounded-md" type="Submit">Submit</button>
                    </div>
                </form>
                <div className="flex flex-col mt-8">
                    <p className="mb-2">Still not a member, or want to create a Venue Manager* account? <a className="border-accent border-b text-gray-200" href="/register">Click here to register</a><span className="opacity-50 text-sm ml-2">*To rent out a venue, you need a Venue Manager account</span></p>
                </div>
            </div>
            <div className="ml-1 mt-8 w-100">
                <h2 className="text-2xl font-['Playfair_Display_SC']mb-4">FAQ</h2>
                <div className="border-accent border-b w-100 p-4 mb-4">
                <h3 className="text-xl">What is VenueVista?</h3>
                <p className="px-2">VenueVista is a school project for Noroffs Exam for Front-end Developers</p>
                </div>
                <div className="border-b border-accent w-100 p-4">
                <h3 className="text-xl">Who created VenueVista?</h3>
                <p className="px-2">VenueVista is created by Ole Martin Keiseraas, check out my <strong><a href="https://github.com/OleMartinKeis">Github</a></strong></p>
                </div>
            </div>
        </div>
    )
}

export default Login;