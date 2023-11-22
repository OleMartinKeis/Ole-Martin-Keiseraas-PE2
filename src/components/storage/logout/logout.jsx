import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <button
      className="rounded-md mt-2 bg-cta text-white text-sm p-1"
      onClick={handleButtonClick}
    >
      Log out
    </button>
  );
}

export default Logout;
