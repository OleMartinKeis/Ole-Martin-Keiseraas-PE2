import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../storage/getApi";
import { API_HOST_URL } from "../../storage/constants";
import Calendar from "react-calendar";
import { Helmet } from "react-helmet";

function Venue() {
  const { id } = useParams();
  const { data } = useAPI(
    `${API_HOST_URL}/venues/${id}?_owner=true&_bookings=true`
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numGuests, setNumGuests] = useState(1);
  const [bookingError, setBookingError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const token = localStorage.getItem("token");

  const metaLabels = {
    wifi: "fa-wifi",
    pets: "fa-paw",
    breakfast: "fa-mug-hot",
    parking: "fa-square-parking",
  };

  const bookedDates =
    data.bookings && data.bookings.length > 0
      ? data.bookings.map((booking) => ({
          dateFrom: booking.dateFrom,
          dateTo: booking.dateTo,
          title: `Booking ID: ${booking.id}`,
        }))
      : [];

  const handleNumGuestsChange = (e) => {
    setNumGuests(Number(e.target.value));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_HOST_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        setBookingStatus("success");
      } else {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          const errorMessages = errorData.errors.map((error) => error.message);
          setBookingError(errorMessages.join(", "));
        } else {
          setBookingError(errorData.message || "Booking failed");
        }
        setBookingStatus("error");
      }
    } catch (error) {
      console.error("Error adding booking:", error.message);
      setBookingError("An unexpected error occured");
      setBookingStatus("error");
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans">
      <Helmet>
        ( <title>{`${data.name} | VenueVista`}</title>)
        <meta
          name="description"
          content="Book a vacation or look at a venue | VenueVista, a vacation booking site"
        />
      </Helmet>

      <div className="pt-8 pb-2 border-t border-accent bg-primary">
        <h1 className=" text-lg text-text md:text-2xl ml-6 font-['Playfair_Display_SC']">
          {data.name}
        </h1>
      </div>
      <div className="flex justify-center bg-gradient-to-b from-primary from-10% to-bg   mb-8 shadow-">
        <div className="grid gap-1 md:gap-3">
          <div className="col-span-6 gap-1 row-span-2 w-1/2 m-auto">
            {data.media?.length === 1 && (
              <img
                className="w-full h-full object-cover aspect-4/3 rounded border-accent border shadow-xl"
                src={data.media[0]}
                alt={`Venue ${data.media[0]}`}
              />
            )}
            {data.media?.length > 1 && selectedImage && (
              <img
                className="w-full h-full object-cover aspect-4/3 rounded border-accent border shadow-xl"
                src={selectedImage}
                alt={`Venue ${selectedImage}`}
              />
            )}
          </div>
          {data.media?.length > 1 &&
            data.media?.map((image, index) => (
              <div
                key={index}
                className={`md:col-span-1 md:row-span-1 cursor-pointer w-1/2 md:w-full md:h-1/2`}
              >
                <img
                  className={` md:w-full md:h-full object-cover aspect-square rounded-lg ${
                    (data.media.length === 1 && selectedImage === image) ||
                    (data.media.length > 1 && image === selectedImage)
                      ? "selected-image"
                      : "other-image"
                  }`}
                  src={image}
                  alt={`Venue ${index}`}
                  onClick={() =>
                    data.media.length > 1 && handleImageClick(image)
                  }
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="w-full">
          {data.owner ? (
            <div className="md:ml-6  md:mt-5 md:m-auto md:mr-6">
              <hr className="border-accent" />
              <h3 className="pt-5 text-center pb-5 text-base md:text-lg">
                {data.owner.name} Is a trusted host<br></br> Cancel within 1
                week for no charge
              </h3>
              <hr className="border-accent" />
            </div>
          ) : (
            <h3>Anonymous</h3>
          )}
          <div className=" ml-1 md:ml-6">
            <p className="font-sans md:flex-row mt-5 ">{data.description}</p>
          </div>
          <div>
            <div className="pt-1 pb-1 text-center md:text-left md:ml-6 mt-5">
              <p className="font-link pb-2 pt-2">
                Price per night: {data.price} kr
              </p>
              <p className="font-link pb-2 pt-2">
                Max Guests: {data.maxGuests}
              </p>
              <p className="font-link pb-2 pt-2">Rating: {data.rating}</p>
            </div>
          </div>
        </div>
        <div className="border-accent border bg-black max-w-sm rounded-xl  m-auto md:mr-0 mt-4">
          <div className="flex place-content-center text-center text align-middle flex-col">
            <h2>Location:</h2>
            {data.location ? (
              <>
                <h3>
                  {data.location.continent}, {data.location.country}
                </h3>
                <h4>
                  {data.location.zip}, {data.location.city}
                </h4>
                <p>
                  Latitude: {data.location.lat}, Longitude: {data.location.lng}
                </p>
              </>
            ) : (
              <p>No information provided</p>
            )}
          </div>
          <div className="flex">
            <div className="text-center">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <h2 className="mt-4">Book now!</h2>
                  <Calendar
                    selectRange={true}
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="Calendar-container bg-white text-text mt-6 p-4 border border-gray-300 rounded-lg shadow-md md:max-w-sm md:mx-auto m-auto"
                    tileClassName={({ date, view }) => {
                      if (view === "month") {
                        const isBooked = bookedDates.some(
                          (bookingDate) =>
                            date >= new Date(bookingDate.dateFrom) &&
                            date <= new Date(bookingDate.dateTo)
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
                        <span>Start: </span>
                        {selectedDate[0].toDateString()}
                      </p>
                      <p>&nbsp; to &nbsp;</p>
                      <p>
                        <span>End: </span> {selectedDate[1].toDateString()}
                      </p>
                      <div className="mb-3">
                        <label htmlFor="number">Number of guests:</label>
                        <input
                          className="bg-background border-b border-accent ml-1 px-2 leading-tight"
                          type="number"
                          min="1"
                          value={numGuests}
                          onChange={handleNumGuestsChange}
                          max={data.maxGuests}
                        />

                        <button
                          type="submit"
                          className="rounded-md mt-2 bg-cta border-cta border  text-white text-sm p-1 hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary"
                        >
                          Add booking!
                        </button>
                        {bookingStatus === "success" && (
                          <p className="text-accent text-sm mt-2">
                            Booking added successfully!
                          </p>
                        )}
                        {bookingStatus === "error" && (
                          <p className="text-red-500 text-sm mt-2">
                            {bookingError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pb-5 flex flex-col">
        <form className="m-auto">
          {data.meta &&
            Object.entries(metaLabels).map(([property, className]) => (
              <span key={property} className="">
                <i
                  className={`fa-solid ${className} text-accent text-xl sm:text-2xl md:text-6xl`}
                >
                  <span className="sr-only">{property}</span>
                </i>
                <input
                  name={property}
                  type="checkbox"
                  disabled
                  checked={data.meta[property]}
                  className="w-4 h-4 ml-1 mr-6"
                />
              </span>
            ))}
        </form>
      </div>
    </div>
  );
}

export default Venue;
