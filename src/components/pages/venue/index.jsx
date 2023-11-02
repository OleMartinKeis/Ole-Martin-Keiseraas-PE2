import React from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../storage/getApi";
import { API_HOST_URL } from "../../storage/constants";
import Booking from "./booking";


function Venue() {
    const { id } = useParams();
    const { data } = useAPI(`${API_HOST_URL}/venues/${id}?owner=true&bookings=true`)
    
    if (!data) {
        return <div>Loading...</div>
    }

    const metaLabels = {
        wifi: "fa-wifi",
        pets: "fa-paw",
        breakfast: "fa-mug-hot",
        parking: "fa-square-parking",
    };

    
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
                    <h2>Owner:</h2>
                    {data.owner ? (
                        <h3>{data.owner.name}</h3>
                    ) : (
                        <h3>Anonymous</h3>
                    )}
                </div>
                {data.bookings &&
                    data.bookings.map(() => (
                        <div>{data.booking}</div>
                    ))}
                <Booking />
            </div>
        </div>
    )
    
}

export default Venue;