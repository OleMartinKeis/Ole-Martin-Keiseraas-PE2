import React, { useEffect, useState } from "react";
import useAPI from "../../../storage/getApi";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";
import { useAuth } from "../../../storage/authentication";

function Booking() {
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true)
    const { isAuthenticated } = useAuth();
    const authToken = isAuthenticated ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (!authToken) {
            setLoading(false);
            return;
        }

        const fetchBookings = async () =>{

            try {
                
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                };

                console.log(authToken)
                console.log(headers)
                
                const response = await fetch(`${API_HOST_URL}/bookings`, headers);
                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data)
                    
                } else {
                    console.error("Failed to fetch bookings")
                }
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        };
        fetchBookings();
    }, [authToken])

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2>Bookings for this Venue</h2>
            <ul>
            {bookings.map((booking) => (
                <li key={booking.id}>
                Booking ID: {booking.id}
                <br />
                Date From: {booking.dateFrom}
                <br />
                Date To: {booking.dateTo}
                </li>
            ))}
            </ul>
      </div>
    )
}

export default Booking;