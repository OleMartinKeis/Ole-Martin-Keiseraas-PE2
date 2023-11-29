import React, { useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import useAPI from "../../storage/getApi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const path = "/venues";

function Venues() {
  const [userInput, setUserInput] = useState("");
  const url = `${API_HOST_URL}${path}?_owner=true&_bookings=true`;
  const { data: apiData, isLoading, isError } = useAPI(url);

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
  };

  const filteredData = apiData.filter((item) => {
    const itemAddress = (item.location.address || "").toLowerCase();
    const itemCity = (item.location.city || "").toLowerCase();
    const itemCountry = (item.location.country || "").toLowerCase();
    const itemName = (item.name || "").toLowerCase();
    const itemContinent = (item.location.continent || "").toLowerCase();

    const userInputLower = userInput.toLowerCase();

    return (
      itemName.includes(userInputLower) ||
      itemAddress.includes(userInputLower) ||
      itemCity.includes(userInputLower) ||
      itemCountry.includes(userInputLower) ||
      itemContinent.includes(userInputLower)
    );
  });

  return (
    <div className="w-100">
      <Helmet>
        <title>Venues | VenueVista</title>
        <meta
          name="description"
          content="All of our venues at VenueVista, a vacation booking site"
        />
      </Helmet>
      <div className="flex place-content-center">
        <input
          type="text"
          className="mt-4 mb-4 p-1"
          value={userInput}
          placeholder="Search for venues!"
          onChange={handleInputChange}
        ></input>
      </div>
      <div></div>
      <div className="flex place-content-center flex-wrap basis-3">
        {filteredData.map((item) => (
          <div key={item.id} className="flex p-4 border-2 max-w-sm">
            <Link to={`/venues/${item.id}`}>
              <div className="">
                <h2 className="text-xl">{item.name}</h2>
                <div className="w-64 h-64">
                  <img
                    src={item.media[0]}
                    className="w-full h-full object-cover rounded-md"
                  ></img>
                </div>
                <div className="mt-2">
                  <p className="opacity-50 italic text-sm">
                    {item.location.country}, {item.location.city}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Venues;
