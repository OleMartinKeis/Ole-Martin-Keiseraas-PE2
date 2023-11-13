import React from "react";

function ViewBookings() {
    const path = `/venues/${id}`
    const authToken = localStorage.getItem("token");

    const handleViewBookings = async () => {
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
            <button onClick={handleViewBookings} className="bg-cta">DELETE</button>
        </div>

    )

}

export default ViewBookings;