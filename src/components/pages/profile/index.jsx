import React from "react";
import { useForm, Controller } from "react-hook-form";
import { API_HOST_URL } from "../../storage/constants";




function Profile() {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData)
    const token = localStorage.getItem("token")
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            venueManager: false,
        }
    });

    const path = `/profiles/${user.name}/media`

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${API_HOST_URL}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                const updatedUser= { ...user, avatar: data.avatar };
                localStorage.setItem("user", JSON.stringify(updatedUser))
            } else {
                console.error("Registration failed");
            }

        }  catch (error) {
            console.error("Error: ", error)
        }
    }
    

    return (
        <div>
            <h1>Welcome back {user.name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Your username: </label>
                    <Controller name="name" control={control}  render={({ field }) => <input placeholder={`${user.name}`} {...field} disabled required type="text" />}/>
                </div>
                <div>
                    <label>Your email: </label>
                    <Controller name="email" control={control}  render={({ field }) => <input placeholder={`${user.email}`} disabled {...field} required type="text" />}/>
                </div>
                <div className="p-3">
                    <div>
                        <h3>Change avatar:</h3>
                        <p>Current avatar: {user.avatar}</p>
                        <label>Avatar:</label>
                        <Controller name="avatar"  control={control} render={({ field }) => <input {...field} type="url" className="bg-slate-500" />}/>
                    </div>
                <button className="bg-cta">Update avatar</button>
                </div>
            </form>
        </div>

    )
}

export default Profile;