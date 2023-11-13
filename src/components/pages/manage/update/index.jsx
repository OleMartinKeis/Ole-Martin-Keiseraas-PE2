import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";

function Edit() {
    const { id } = useParams();
    const path = `/venues/${id}`
    const authToken = localStorage.getItem("token");
    const { control, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            name: '',
            description: '',
            media: [],
            price: 0,
            maxGuests: 0,
            rating: 0,
            meta: {
                wifi: false,
                parking: false,
                breakfast: false,
                pets: false
            },
            location: {
                address: "",
                city: "",
                zip: "",
                country: "",
                continent: "",
                lat: 0,
                lng: 0
            }
        }
    });
    const { isSubmitting } = formState;
    const [data, setData] = React.useState(null);
    const [mediaUrls, setMediaUrls] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`${API_HOST_URL}${path}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`
                    },
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData)
                    reset({
                        name: responseData.name,
                        description: responseData.description,
                        media: responseData.media,
                        price: responseData.price,
                        maxGuests: responseData.maxGuests,
                        rating: responseData.rating,
                        meta: {
                            wifi: responseData.meta.wifi,
                            parking: responseData.meta.parking,
                            breakfast: responseData.meta.breakfast,
                            pets: responseData.meta.pets
                        },
                        location: {
                            address: responseData.address,
                            city: responseData.city,
                            zip: responseData.zip,
                            country: responseData.country,
                            continent: responseData.continent,
                            lat: responseData.lat,
                            lng: responseData.lng
                        }
                    });
                }
            } catch (error) {
                console.error("Error fetching venue data:", error);
            }
        };

        fetchData();
    }, [reset, path, authToken]);

    const handleEditVenue = async () => {
        try{
            const updatedData = { ...data };
            updatedData.media = mediaUrls;

            const response = await fetch(`${API_HOST_URL}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(updatedData),
            })
            if (response.ok) {
                alert("updated")

            }
        } catch (error) {
            console.error("Error updating venue:", error)
        }
    };

    const addMediaUrl = (url) => {
        setMediaUrls([...mediaUrls, url])
    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleEditVenue)}>
                <div>
                    <label>Name of venue:</label>
                    <Controller name="name" control={control} rules={{ required: 'Name is required' }} render={({ field }) => <input className="text-text" {...field} required type="text" />}/>
                </div>
                <div>
                    <label>Describe the venue:<span className="opacity-50">(location, facilities, etc)</span></label>
                    <Controller name="description" control={control} rules={{ required: 'Description is required' }} render={({ field }) => <input className="text-text" {...field} required type="text" />}/>
                </div>
                <div>
                    <label>Media</label>
                    <Controller name="media-1" control={control}  render={({ field }) => <input className="text-text" {...field} onChange={(e) => addMediaUrl(e.target.value)} type="url" required/>}/>
                </div>
                <div>
                    <label>Media</label>
                    <Controller name="media-2" control={control} render={({ field }) => <input className="text-text" {...field} type="url" />}/>
                </div>
                <div>
                    <label>Media</label>
                    <Controller name="media-3" control={control} render={({ field }) => <input className="text-text" {...field} type="url" />}/>
                </div>
                <div>
                    <label>Rating:</label>
                    <Controller name="rating" control={control} render={({ field }) => <input className="text-text" {...field} type="number" />}/>
                </div>
                <div>
                    <label>Price per night in NOK:</label>
                    <Controller name="price" control={control} render={({ field }) => <input className="text-text" {...field} required type="number" />}/>
                </div>
                <div>
                    <label>Max guests:</label>
                    <Controller name="maxGuests" control={control} render={({ field }) => <input className="text-text" {...field} type="number" required />}/>
                </div>
                <div>
                    <div>
                        <label>Wifi:</label>
                        <Controller name="wifi" control={control} render={({ field }) => <input className="text-text" {...field} type="checkbox" />}/>
                    </div>
                    <div>
                        <label>Parking:</label>
                        <Controller name="parking" control={control} render={({ field }) => <input className="text-text" {...field} type="checkbox"/>}/>
                    </div>
                    <div>
                        <label>Breakfast:</label>
                        <Controller name="breakfast" control={control} render={({ field }) => <input className="text-text" {...field} type="checkbox" />}/>
                    </div>
                    <div>
                        <label>Pets:</label>
                        <Controller name="pets" control={control} render={({ field }) => <input className="text-text" {...field} type="checkbox"/>}/>
                    </div>
                </div>
                
                <div>
                    <button disabled={isSubmitting} className="bg-cta" type="Submit">Register
                    </button>
                </div>
            </form>
        </div>

    )

}

export default Edit;