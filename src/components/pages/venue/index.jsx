import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../storage/getApi";
import { API_HOST_URL } from "../../storage/constants";
import BookingInfo from "./booking";
import Calendar from "react-calendar";


function Venue() {
    const { id } = useParams();
    const { data } = useAPI(`${API_HOST_URL}/venues/${id}?_owner=true&_bookings=true`);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numGuests, setNumGuests] = useState(1);
    const token = localStorage.getItem("token")


    const metaLabels = {
        wifi: "fa-wifi",
        pets: "fa-paw",
        breakfast: "fa-mug-hot",
        parking: "fa-square-parking",
    };

    const bookedDates = data.bookings && data.bookings.length > 0
    ? data.bookings.map((booking) => ({
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        title: `Booking ID: ${booking.id}`,
      }))
    : [];

    const handleNumGuestsChange = (e) => {
        setNumGuests(Number(e.target.value));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_HOST_URL}/bookings`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify({
                venueId: id,
                dateFrom: selectedDate[0],
                dateTo: selectedDate[1],
                guests: numGuests,
              }),
            });
      
            if (response.ok) {
              console.log("Booking added successfully!");
            } else {
                console.log(token)
              console.error("Error adding booking:", response.statusText);
            }
          } catch (error) {
            console.error("Error adding booking:", error.message);
          }
        };
  
        if (!data) {
          return <div>Loading...</div>

    }
    
    return(
        <div>
            <div>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
            </div>
            <div>
                <div className="flex flex-wrap">
                {data.media && data.media.length > 0 && (
                    <img
                        src={data.media[0]}
                        alt={data.name}
                        className="w-1/2 h-auto"
                    />
                )}
                {data.media &&
                    data.media.slice(1).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={data.name}
                            className="w-1/4 h-auto"
                        />
                    ))}
                </div>
            </div>
            <div>
                <h2>Owner:</h2>
                    {data.owner ? (
                        <div>
                            <hr className="border-accent"/>
                                <h3 className="pt-4 pb-4">{data.owner.name} Is a trusted host <br></br> Cancel within 1 week for no charge</h3>
                            <hr className="border-accent"/>
                        </div>
                    ) : (
                        <h3>Anonymous</h3>
                       
                    )}
                </div>
                <div>
                    <p>Price per night: {data.price} kr</p>
                    <p>Max Guests: {data.maxGuests}</p>
                    <p>Rating: {data.rating}</p>
                </div>
            <div>
            <form>
                {data.meta &&
                    Object.entries(metaLabels).map(([property, className]) => (
                        <span key={property}>
                            <i className={`fa-solid ${className} text-accent text-6xl`}><span className="sr-only">{property}</span></i>
                            <input type="checkbox" disabled checked={data.meta[property]} className="w-4 h-4 ml-1 mr-6" />
                        </span>
                    ))}          
            </form>
                <div>
                    <h2>Location:</h2>
                    {data.location ? (
                        <>
                            <h3>{data.location.continent}, {data.location.country}</h3>
                            <h4>{data.location.zip}, {data.location.city}</h4>
                            <p>Latitude: {data.location.lat}, Longitude: {data.location.lng}</p>
                        </>
                    ) : (
                        <p>No information provided</p>
                    )}
                </div>
            <div>
            {data.bookings && data.bookings.length > 0 && (
                <div>
                    <h2>Bookings for this Venue</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2>Calendar</h2>
                            <Calendar
                            selectRange={true}
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="Calendar-container bg-white text-text mt-6 p-4 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto "
                            tileClassName={({ date, view }) => {
                                if (view === "month") {
                                const isBooked = bookedDates.some(
                                    (bookingDate) =>
                                    date >= new Date(bookingDate.dateFrom) && date <= new Date(bookingDate.dateTo)
                                );
                            return isBooked && "booked-date";
                            }
                            }}
                            />
                        </div>
                        <div>
                            {selectedDate.length > 0 && (
                                <div>
                                    <p>
                                        <span>Start: </span>{selectedDate[0].toDateString()}
                                        &nbsp; to &nbsp;
                                        <span>End: </span> {selectedDate[1].toDateString()}
                                    </p>
                                    <label>Number of guests:</label>
                                    <input
                                    className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                                    type="number"
                                    value={numGuests}
                                    onChange={handleNumGuestsChange}
                                    min="1"
                                    max={data.maxGuests}
                                    />
                                    <button type="submit" className="bg-cta">Add booking!</button>
                                </div>
                            )}
                        </div>
                    </form>

                </div>
                )}
            </div>
        </div>
    </div>
    )
    
}

export default Venue;