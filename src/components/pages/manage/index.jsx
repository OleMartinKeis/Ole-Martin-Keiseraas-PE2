import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import Delete from "./delete";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function ManageVenues() {
  const [venues, setVenues] = useState([]);
  const [showVenues, setShowVenues] = useState(false);
  const authToken = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const [path, setPath] = useState("/home");

  const handleDeleteVenue = (deletedVenueId) => {
    setVenues((prevVenues) =>
      prevVenues.filter((venue) => venue.id !== deletedVenueId)
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleShowVenues = async () => {
    if (showVenues) {
      setShowVenues(false);
    } else {
      try {
        const response = await fetch(`${API_HOST_URL}${path}?_bookings=true`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(),
        });
        if (response.ok) {
          const data = await response.json();
          setVenues(data);
          setShowVenues(true);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }
  };

  useEffect(() => {
    if (user && user.name) {
      setPath(`/profiles/${user.name}/venues`);
    }
  });

  return (
    <div>
      <Helmet>
        <title>Manager panel | VenueVista</title>
        <meta name="description" content="Your Manager panel at VenueVista" />
      </Helmet>
      <div className=" bg-gradient-to-b from-primary from-10% to-bg h-40"></div>
      <h2 className="text-lg md:text-xl text-center pt-20 font-['Playfair_Display_SC']">
        Welcome back {user.name}, to your manager panel
      </h2>
      <div className=" flex flex-row items-center justify-center mt-20">
        <div>
          <Link to="/create">
            <button className="bg-background text-white border py-4 px-6 rounded-lg hover:border-accent hover:shadow-lg hover:text-background hover:bg-primary active:bg-primary ">
              Create a venue
            </button>
          </Link>
        </div>
        <button
          className="bg-background text-white border py-4 px-6 rounded-lg ml-4 hover:border-accent hover:shadow-lg hover:text-background hover:bg-primary active:bg-primary active:bg-accent-dark active:shadow-none focus:bg-primary focus:border-accent focus:text-text shadow-outline-accent focus:shadow-outline-accent"
          onClick={handleShowVenues}
        >
          {showVenues ? "Hide My Venues" : "Show My Venues"}
        </button>
      </div>
      <div>
        {showVenues && venues.length > 0 && (
          <div className="flex-shrink-0 mt-4">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="bg-black rounded-lg shadow-xl border-accent border p-4 mb-4 w-3/4 m-auto "
              >
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <h2 className="text-xl border-b border-accent">
                        {venue.name}
                      </h2>
                      {venue.bookings && venue.bookings.length > 0 && (
                        <div>
                          <p className="mt-1">Bookings:</p>
                          <ul>
                            {venue.bookings.map((booking) => (
                              <li
                                key={booking.id}
                                className="text-xs sm:text-sm md:text-base p-1 border-accent border bg-primary text-text rounded-xl mt-2 shadow-xl"
                              >
                                {`From: ${formatDate(
                                  booking.dateFrom
                                )} To: ${formatDate(booking.dateTo)}, Guests: ${
                                  booking.guests
                                }`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row mt-1 md:mt-2">
                      <Link to={`/edit/${venue.id}`}>
                        <button className="rounded-md bg-cta border-cta border  text-white text-sm p-1 hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary">
                          Edit
                        </button>
                      </Link>
                      <Delete id={venue.id} onDelete={handleDeleteVenue} />
                    </div>
                  </div>
                  <div className="ml-auto flex items-center justify-center">
                    <div>
                      {venue.media.length > 0 && (
                        <img
                          src={venue.media[0]}
                          className="h-20 w-20"
                          alt={`Venue ${venue.name} - Image 1}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showVenues && venues.length === 0 && (
          <div className="bg-black border-accent border p-2 w-1/2 m-auto mt-2 rounded-md text-sm md:text-center">
            <h2 className="">
              No Venues available. Click <span> </span>
              <Link className="text-accent" to="/create">
                here
              </Link>{" "}
              to create a venue.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageVenues;
