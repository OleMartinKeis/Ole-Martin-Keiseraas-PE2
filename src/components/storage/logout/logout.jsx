import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const handleButtonClick = () =>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/home");
    }   
  
    return(
        <button className="bg-cta" onClick={handleButtonClick}>Log out</button>
    )
}

export default Logout;