import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import Delete from "./delete";
import { Link } from "react-router-dom";


const user = JSON.parse(localStorage.getItem("user"));
const path = `/profiles/${user.name}/venues`

function ManageVenues() {
    const [venues, setVenues] = useState([]);
    const [showVenues, setShowVenues] = useState(false);
    const authToken = localStorage.getItem("token");

        const handleShowVenues = async () => {
            if (showVenues){
                setShowVenues(false);
            } else {
                try {
                    const response = await fetch(`${API_HOST_URL}${path}?_bookings=true`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${authToken}`
                        },
                        body: JSON.stringify(),
                    })
                    if (response.ok) {
                        const data = await response.json()
                        setVenues(data)
                        setShowVenues(true)
                    }
                } catch (error) {
                    console.error("Error fetching venues:", error)
                }
            }
        };

    return (
        <div>
            <div className="p-4 space-y-4">
                <button className="bg-blue-500 text-white py-4 px-6 rounded-lg" onClick={handleShowVenues}>
                {showVenues ? "Hide My Venues" : "Show My Venues"}
                </button>
                <div>
                    {showVenues && venues.length > 0 && (
                        <div className="space-y-2">
                            { venues.map((venue) => (
                                <div key={venue.id} className="bg-black rounded-lg shadow p-4">
                                    <h2>{venue.name}</h2>
                                    <p>Bookings: {venue.bookings}</p>
                                    <Link to={`/edit/${venue.id}`}>
                                        <button className="bg-cta">Edit</button>
                                    </Link>
                                    <Delete id={venue.id}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {showVenues && venues.length === 0 && (
                        <h2>No Venues available.</h2>
                    )}
                </div>
                <div>
                    <Link to="/create">
                        <button className="bg-blue-500 text-white py-4 px-6 rounded-lg">Create a venue</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ManageVenues;