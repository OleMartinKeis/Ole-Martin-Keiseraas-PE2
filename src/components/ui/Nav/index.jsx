import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../storage/authentication";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const user = JSON.parse(localStorage.getItem("user"))
    const isVenueManager = user && user.venueManager === true;

    return (
        <div>
            <nav className="p-4 bg-primary">
                <div className="container mx-auto flex justify-between items-center">
                    <span onClick={() => navigate("/")} className="text-text text-2xl font-bold hover:text-gray-100 hover:cursor-pointer font-['Playfair_Display_SC']">
                    VenueVista
                    </span>
                    <ul className="flex space-x-4">
                        {isAuthenticated ? (
                            <li>
                                <span onClick={() => navigate("/profile")} className="text-text hover:text-gray-100 hover:cursor-pointer">
                                My Profile
                                </span>
                            </li>
                        ) : (
                            <li>
                                <span onClick={() => navigate("/register")} className="text-text hover:text-gray-100 hover:cursor-pointer">Register</span>
                            </li> 
                        )}
                        {!isAuthenticated ? (
                        <li>
                            <span onClick={() => navigate("/login")} className="text-text hover:text-gray-100 hover:cursor-pointer">Login</span>
                        </li>
                    ) : (
                        <li>
                            <span onClick={() => navigate("/venues")} className="text-text hover:cursor-pointer hover:text-gray-100">
                            Venues
                            </span>
                        </li>
                    )}

                    {isVenueManager && isAuthenticated && (
                        <li>
                            <span onClick={() => navigate("/manage")} className="text-text hover:cursor-pointer hover:text-gray-100">Manage venues</span>
                        </li>
                    )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;