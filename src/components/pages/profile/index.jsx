import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { API_HOST_URL } from "../../storage/constants";
import Logout from "../../storage/logout/logout";
import useAPI from "../../storage/getApi";




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

    const [bookings, setBookings] = useState([])

    const handleShowBookings = async (data) => {
        try {
            const response = await fetch(`${API_HOST_URL}/profiles/${user.name}?_bookings=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            if (response.ok) {
                
                    const data = await response.json();
                    setBookings(data.bookings || []);
                
            } else {
                console.error("Fetching bookings failed");
            }
        } catch (error) {
            console.error("Error", error)
        }
    }
        

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
            <h1 className="text-2xl font-['Playfair_Display_SC']">Welcome back {user.name}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Your username: </label>
                    <Controller name="name" control={control}  render={({ field }) => <input placeholder={`${user.name}`} {...field} disabled required type="text" className="bg-background border-b border-accent ml-3 px-2 leading-tight"/>}/>
                </div>
                <div>
                    <label>Your email: </label>
                    <Controller name="email" control={control}  render={({ field }) => <input placeholder={`${user.email}`} disabled {...field} required type="text" className="bg-background border-b border-accent ml-3 px-2 leading-tight"/>}/>
                </div>
                <div className="p-3">
                    <div>
                        <h3>Change avatar:</h3>
                        <p>Current avatar: <span className="bg-background border-b border-accent ml-3 px-2 leading-tight">{user.avatar}</span></p>
                        <label>Avatar:</label>
                        <Controller name="avatar"  control={control} render={({ field }) => <input {...field} type="url" className="bg-background border-b border-accent ml-3 px-2 leading-tight " />}/>
                    </div>
                <button className="bg-cta mt-2">Update avatar</button>
                </div>
            </form>
            <div>
                <button className="bg-cta" onClick={handleShowBookings}>Show my bookings</button>
                {bookings.map((booking) => (
                    <div key={booking.id}>
                        <p>
                            <strong className="font-['Playfair_Display_SC'">Venue Name:</strong> {booking.venue.name}
                        </p>
                        <p>
                            <strong>Booking ID:</strong> {booking.id}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>

            <Logout />
        </div>

    )
}

export default Profile;