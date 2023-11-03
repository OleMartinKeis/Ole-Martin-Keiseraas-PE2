import React, { useState } from "react";
import useAPI from "../../storage/getApi";
import { API_HOST_URL } from "../../storage/constants";
import VenueSearch from "./venueSearch.jsx";

function Home() {
    const { data: allVenues } = useAPI(`${API_HOST_URL}/venues?owner=true&bookings=true`)
    const [filteredVenues, setFilteredVenues] = useState(allVenues);
    const [noResults, setNoResults] = useState(false);

    const filterVenues = (searchParams) => {
        
        const filtered = allVenues.filter((venue) => {
            const searchLocation = searchParams.location.toLowerCase();
            const matchesLocation = 
            venue.location && 
            venue.location.continent.toLowerCase().startsWith(searchLocation) ||
            venue.location.country.toLowerCase().startsWith(searchLocation);

            const matchesGuests = !searchParams.guest || venue.maxGuests >= parseInt(searchParams.guests);

            const checkInDate = new Date(searchParams.checkInDate);
            const checkOutDate = new Date(searchParams.checkOutDate)
            const matchesDate = 
            !searchParams.checkInDate ||
            !searchParams.checkOutDate ||
                (venue.bookings || []).every((booking) => {
                    const bookingStartDate = new Date(booking.dateFrom);
                    const bookingEndDate = new Date(booking.dateTo);
                    return (
                        bookingEndDate <= checkInDate ||
                        bookingStartDate >= checkOutDate
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
            setNoResults(false)
        }
        
        setFilteredVenues(filtered);
    }

    return (
        <div className="w-100">
            <div className="flex place-content-center">
                <h1>Unusual places for extraordinary people</h1>
            </div>
            <div className="p-4 text-text" >
                <VenueSearch onSearch={filterVenues}/>
                {noResults && <p>Your search didn't provide any results, please try again</p>}
            </div>
            <div className="flex place-content-center flex-wrap basis-3">
                {filteredVenues.length > 0 ? (
                filteredVenues.map((item) => (
                    <div key={item.id} className="flex p-4 border-2 max-w-sm">
                        <a href={`/venues/${item.id}`}>
                            <div className="">
                                <h2 className="text-xl">{item.name}</h2>
                                <div className="w-64 h-64">
                                    <img src={item.media[0]} className="w-full h-full object-cover rounded-md"></img>
                                </div>
                                <div className="mt-2">
                                    <p className="opacity-50 italic text-sm">{item.location.country}, {item.  location.city}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                ))
            ) : (
                allVenues.map((item) => (
                    <div key={item.id} className="flex p-4 border-2 max-w-sm">
                      <a href={`/venues/${item.id}`}>
                        <div className="">
                          <h2 className="text-xl">{item.name}</h2>
                          <div className="w-64 h-64">
                            <img src={item.media[0]} className="w-full h-full object-cover rounded-md"></img>
                          </div>
                          <div className="mt-2">
                            <p className="opacity-50 italic text-sm">{item.location.country}, {item.location.city}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))
            )}
            </div>
        </div>

    )
}

export default Home;