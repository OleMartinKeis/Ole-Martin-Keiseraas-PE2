import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { API_HOST_URL } from "../../storage/constants";

const path = "/auth/login"

function Login() {
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });


    const { isSubmitting } = formState;
    const toHome = useNavigate();

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
                const responseData = await response.json();
                const user = {
                    name: responseData.name,
                    email: responseData.email,
                    avatar: responseData.avatar,
                    venueManager: responseData.venueManager,
                };
                localStorage.setItem("token", responseData.accessToken)
                localStorage.setItem("user", JSON.stringify(user))
                toHome("/")
            } else {
                console.error("Login failed");
            }

        }  catch (error) {
            console.error("Error: ", error)
        }
          
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Email:</label>
                    <Controller name="email" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} required type="text" />}/>
                </div>
                <div>
                    <label>Password:</label>
                    <Controller name="password" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input {...field} type="text" required/>}/>
                </div>
                <div>
                    <button disabled={isSubmitting}  className="bg-cta" type="Submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;