import React from "react";
import { Router } from "react-router";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className="p-4 bg-primary">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-text text-2xl font-bold hover:text-gray-100 font-['Playfair_Display_SC']">
                    VenueVista
                    </Link>

                    <ul className="flex space-x-4">
                    <li>
                        <Link to="/venues" className="text-text hover:text-gray-100">
                        Venues
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" href="/profile" className="text-text hover:text-gray-100">
                        My Profile
                        </Link>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;