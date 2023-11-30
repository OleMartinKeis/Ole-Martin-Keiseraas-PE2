import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../storage/authentication";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  const isVenueManager = user && user.venueManager === true;

  return (
    <div>
      <nav className="p-4 bg-primary">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? " text-blue-700 text-xl md:text-2xl font-bold hover:text-text font-['Playfair_Display_SC']"
                : "text-text text-xl md:text-2xl font-bold hover:text-blue-700 font-['Playfair_Display_SC']"
            }
          >
            VenueVista
          </NavLink>
          <ul className="flex space-x-4 text-xs sm:text-sm md:text-base">
            {isAuthenticated ? (
              <li className="ml-4">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 hover:text-text"
                      : "text-text hover:text-blue-700"
                  }
                >
                  My Profile
                </NavLink>
              </li>
            ) : (
              <li className="ml-1">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 hover:text-text"
                      : "text-text hover:text-blue-700"
                  }
                >
                  Register
                </NavLink>
              </li>
            )}
            {!isAuthenticated ? (
              <li className="ml-1">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 hover:text-text"
                      : "text-text hover:text-blue-700"
                  }
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="ml-1">
                <NavLink
                  to="/venues"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 hover:text-text"
                      : "text-text hover:text-blue-700"
                  }
                >
                  Venues
                </NavLink>
              </li>
            )}

            {isVenueManager && isAuthenticated && (
              <li className="ml-1">
                <NavLink
                  to="/manage"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-700 hover:text-text"
                      : "text-text hover:text-blue-700"
                  }
                >
                  Manage venues
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
