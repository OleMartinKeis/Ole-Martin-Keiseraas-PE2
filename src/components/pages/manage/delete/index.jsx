import React from "react";
import { API_HOST_URL } from "../../../storage/constants";

function Delete({ id }) {
  const path = `/venues/${id}`;
  const authToken = localStorage.getItem("token");

  const handleDeleteVenue = async () => {
    try {
      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(),
      });
      if (response.ok) {
        alert("Deleted");
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteVenue}
        className=" bg-red-700 hover:bg-red-900 text-white ml-2 text-sm p-1 rounded-md"
      >
        DELETE
      </button>
    </div>
  );
}

export default Delete;
