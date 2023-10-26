import React, { useEffect, useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import useAPI from "../../storage/getApi";


const path = "/venues"

function Venues() {
    const [userInput, setUserInput] = useState("");
    const url = `${API_HOST_URL}${path}`;
    const { data: apiData, isLoading, isError } = useAPI(url)
    
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

        return(
            itemName.includes(userInputLower) ||
            itemAddress.includes(userInputLower) ||
            itemCity.includes(userInputLower) ||
            itemCountry.includes(userInputLower) ||
            itemContinent.includes(userInputLower)
        ) 
    });
    

    return(
        <div>
            <div>
                <input type="text" value={userInput} placeholder="Search for venues!" onChange={handleInputChange}></input>
            </div>
            <div>
                {filteredData.map((item) => (
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Venues;