import React from "react";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";



function Delete({ id }) {
    const path = `/venues/${id}`
    const authToken = localStorage.getItem("token");

    const handleDeleteVenue = async () => {
        try{
            const response = await fetch(`${API_HOST_URL}${path}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(),
            })
            if (response.ok) {
                alert("Deleted")

            }
        } catch (error) {
            console.error("Error deleting venue:", error)
        }
    };

    return(
        <div>
            <button onClick={handleDeleteVenue} className="bg-cta">DELETE</button>
        </div>

    )
}


export default Delete;