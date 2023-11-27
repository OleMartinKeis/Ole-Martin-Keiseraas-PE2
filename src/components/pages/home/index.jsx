import React, { useState } from "react";
import useAPI from "../../storage/getApi";
import { API_HOST_URL } from "../../storage/constants";
import VenueSearch from "./venueSearch.jsx";
import { useAuth } from "../../storage/authentication/index.jsx";

function Home() {
  const { data: allVenues } = useAPI(
    `${API_HOST_URL}/venues?owner=true&bookings=true&sort=rating&sortOrder=desc`
  );
  const [filteredVenues, setFilteredVenues] = useState(allVenues);
  const [noResults, setNoResults] = useState(false);
  const { isAuthenticated } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  const metaLabels = {
    wifi: "fa-wifi",
    pets: "fa-paw",
    breakfast: "fa-mug-hot",
    parking: "fa-square-parking",
  };

  const filterVenues = (searchParams) => {
    const filtered = allVenues.filter((venue) => {
      const searchLocation = searchParams.location.toLowerCase();
      const matchesLocation =
        (venue.location &&
          venue.location.continent.toLowerCase().startsWith(searchLocation)) ||
        venue.location.country.toLowerCase().startsWith(searchLocation);

      const matchesGuests =
        !searchParams.guest || venue.maxGuests >= parseInt(searchParams.guests);

      const checkInDate = new Date(searchParams.checkInDate);
      const checkOutDate = new Date(searchParams.checkOutDate);
      const matchesDate =
        !searchParams.checkInDate ||
        !searchParams.checkOutDate ||
        (venue.bookings || []).every((booking) => {
          const bookingStartDate = new Date(booking.dateFrom);
          const bookingEndDate = new Date(booking.dateTo);
          return (
            bookingEndDate <= checkInDate || bookingStartDate >= checkOutDate
          );
        });

      const matchesWifi = !searchParams.wifi || venue.meta.wifi;
      const matchesParking = !searchParams.parking || venue.meta.parking;
      const matchesPets = !searchParams.pets || venue.meta.pets;
      const matchesBreakfast = !searchParams.breakfast || venue.meta.breakfast;

      return (
        matchesLocation &&
        matchesGuests &&
        matchesBreakfast &&
        matchesDate &&
        matchesParking &&
        matchesPets &&
        matchesWifi
      );
    });
    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredVenues(filtered);
  };

  return (
    <div className="w-100">
      <div className="bg-gradient-to-b from-primary from-10% to-bg ">
        <div className="flex place-content-center w-100">
          <div
            className="shadow-2xl rounded-xl inset-0 bg-cover bg-center text-center"
            style={{
              backgroundImage: 'url("../src/assets/frontpage2.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "75%",
              height: "550px",
              margin: "40px 0 0 0",
            }}
          ></div>
          <h1 className="font-['Playfair_Display_SC'] absolute mt-12 md:text-3xl sm:text-xl">
            <span className="bg-gradient-to-r from-accent from-10% to-white bg-clip-text text-transparent">
              <strong>Unusual places for extraordinary people</strong>
            </span>
          </h1>
        </div>
      </div>
      <div className="mt-12 p-4 text-text">
        <VenueSearch onSearch={filterVenues} />
        {noResults && (
          <p>Your search didn't provide any results, please try again</p>
        )}
      </div>
      <div>
        <h2 className="text-xl mt-2 mb-2 md:ml-4">Our highest rated venues:</h2>
        {!isAuthenticated && !user && (
          <p className=" text-center text-white mb-4">
            <a href="/login" className="border-accent border-b text-accent">
              Log in
            </a>
            <span> </span>to view listings
          </p>
        )}
      </div>
      <div className="flex m-auto place-content-center flex-wrap gap-8 max-w-7xl">
        {filteredVenues.length > 0
          ? filteredVenues.map((item) => (
              <div
                key={item.id}
                className="shadow-2xl flex p-2 border-2  max-w-sm rounded-sm hover:rounded-l hover:border-accent hover:text-accent hover:duration-300 mb-4"
              >
                <div className="w-full">
                  <h2 className="text-base truncate max-w-[250px]">
                    {item.name}
                  </h2>
                  <div className="w-64 h-64">
                    <img
                      src={item.media[0]}
                      className="shadow-2xl w-full h-full object-cover rounded-md"
                    ></img>
                  </div>
                  <div className=" flex mt-2">
                    <p className="opacity-50  hover:opacity-100 italic text-sm">
                      {item.location.country}, {item.location.city}
                    </p>
                    <p className=" bg-background ml-auto border-2 rounded-md p-0.5 border-accent text-accent">
                      <span className="">
                        <i className="fa-regular fa-star text-accent"></i>
                        {item.rating}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <form className="flex gap-2">
                      {Object.entries(metaLabels).map(
                        ([property, className]) => (
                          <span className="" key={property}>
                            <i
                              className={`fa-solid ${className}  text-accent text-md`}
                            >
                              <span className="sr-only">{property}</span>
                            </i>
                            <input
                              type="checkbox"
                              disabled
                              checked={item.meta[property]}
                              className="bg-background"
                            />
                          </span>
                        )
                      )}
                    </form>
                    <div className="flex justify-end">
                      <a
                        href={`/venues/${item.id}`}
                        className="flex-col rounded-md mt-2 bg-cta text-white text-sm p-1"
                      >
                        View Venue
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : allVenues.map((item) => (
              <div
                key={item.id}
                className="shadow-2xl flex p-2 border-2  max-w-sm rounded-sm hover:rounded-l hover:border-accent hover:text-accent hover:duration-300 mb-4"
              >
                <div className="w-full">
                  <h2 className="text-base truncate max-w-[250px]">
                    {item.name}
                  </h2>
                  <div className="w-64 h-64">
                    <img
                      src={item.media[0]}
                      className="shadow-2xl w-full h-full object-cover rounded-md"
                    ></img>
                  </div>
                  <div className=" flex mt-2">
                    <p className="opacity-50  hover:opacity-100 italic text-sm">
                      {item.location.country}, {item.location.city}
                    </p>
                    <p className=" bg-background ml-auto border-2 rounded-md p-0.5 border-accent text-accent">
                      <span className="">
                        <i className="fa-regular fa-star text-accent"></i>
                        {item.rating}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <form className="flex gap-2">
                      {Object.entries(metaLabels).map(
                        ([property, className]) => (
                          <span className="" key={property}>
                            <i
                              className={`fa-solid ${className}  text-accent text-md`}
                            >
                              <span className="sr-only">{property}</span>
                            </i>
                            <input
                              type="checkbox"
                              disabled
                              checked={item.meta[property]}
                              className="bg-background"
                            />
                          </span>
                        )
                      )}
                    </form>
                    <div className="flex justify-end">
                      {user && isAuthenticated && (
                        <a
                          href={`/venues/${item.id}`}
                          className="flex-col rounded-md mt-2 bg-cta text-white text-sm p-1"
                        >
                          View Venue
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;
