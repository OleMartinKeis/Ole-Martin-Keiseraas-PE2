import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    localStorage.clear();
    navigate("/home");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button
      className="rounded-md mt-2 bg-cta text-white text-sm p-1 hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary"
      onClick={handleButtonClick}
    >
      Log out
    </button>
  );
}

export default Logout;
