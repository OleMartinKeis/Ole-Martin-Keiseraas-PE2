import React, { useState } from "react";

function VenueSearch({ onSearch }) {
    const [searchParams, setSearchParams] = useState({
        location: "",
        checkInDate: "",
        checkOutDate: "",
        guests: "",
        wifi: false,
        breakfast: false,
        parking: false,
        pets: false,
     });

     const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: type === "checkbox" ? checked: value,
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const query = {
    //         location: searchParams.location,
    //         checkInDate: searchParams.checkInDate,
    //         checkOutDate: searchParams.checkOutDate,
    //         guests: searchParams.guests,
    //         wifi: searchParams.wifi,
    //         parking: searchParams.parking,
    //         breakfast: searchParams.breakfast,
    //     }

    //     onSearch(searchParams)
    // };

    const handleSearch= () => {
        onSearch(searchParams)
        console.log("test")
    }

    return(
        <div>

        <input
          type="text"
          name="location"
          placeholder="Location (continent or country)"
          value={searchParams.location}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="checkInDate"
          value={searchParams.checkInDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="checkOutDate"
          value={searchParams.checkOutDate}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={searchParams.guests}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={searchParams.wifi}
            onChange={handleInputChange}
          />
          Wifi
        </label>
        <label>
          <input
            type="checkbox"
            name="breakfast"
            checked={searchParams.breakfast}
            onChange={handleInputChange}
          />
          Breakfast
        </label>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={searchParams.parking}
            onChange={handleInputChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="pets"
            checked={searchParams.pets}
            onChange={handleInputChange}
          />
          Pets
        </label>
        <button onClick={handleSearch}>Search</button>

        </div>
    )
}

export default VenueSearch;