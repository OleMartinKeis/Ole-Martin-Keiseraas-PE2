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

    const handleSearch= () => {
        onSearch(searchParams)
        console.log("test")
    }

    return(
        <div className="grid">
            <div className="grid-flow-col">
                <input
                type="text"
                name="location"
                placeholder="Location (continent or country)"
                value={searchParams.location}
                onChange={handleInputChange}
                className="bg-background text-white border-b border-accent ml-3 px-2 leading-tight"
                />
                <input
                type="date"
                name="checkInDate"
                value={searchParams.checkInDate}
                onChange={handleInputChange}
                className="bg-background border-b border-accent ml-3 px-2 leading-tight text-white"
                />
                <input
                type="date"
                name="checkOutDate"
                value={searchParams.checkOutDate}
                onChange={handleInputChange}
                className="bg-background border-b border-accent ml-3 px-2 leading-tight text-white"
                />
                <input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                value={searchParams.guests}
                onChange={handleInputChange}
                className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                />
            </div>
            <div>
                <label className="bg-background text-white border-b border-accent ml-3 px-2 leading-tight">
                <input
                    type="checkbox"
                    name="wifi"
                    checked={searchParams.wifi}
                    onChange={handleInputChange}
                    
                />
                Wifi
                </label>
                <label className="bg-background text-white border-b border-accent ml-3 px-2 leading-tight">
                <input
                    type="checkbox"
                    name="breakfast"
                    checked={searchParams.breakfast}
                    onChange={handleInputChange}
                />
                Breakfast
                </label>
                <label className="bg-background text-white border-b border-accent ml-3 px-2 leading-tight">
                <input
                    type="checkbox"
                    name="parking"
                    checked={searchParams.parking}
                    onChange={handleInputChange}
                />
                Parking
                </label>
                <label className="bg-background text-white border-b border-accent ml-3 px-2 leading-tight">
                <input
                    type="checkbox"
                    name="pets"
                    checked={searchParams.pets}
                    onChange={handleInputChange}
                />
                Pets
                </label>
            </div> 
        
        <button className="bg-cta text-white" onClick={handleSearch}>Search</button>

        </div>
    )
}

export default VenueSearch;