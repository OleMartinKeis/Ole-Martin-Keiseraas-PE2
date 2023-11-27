import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";

function Edit() {
  const { id } = useParams();
  const path = `/venues/${id}`;
  const authToken = localStorage.getItem("token");
  const [description, setDescription] = useState("");
  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    },
  });
  const { isSubmitting } = formState;
  const [data, setData] = React.useState(null);
  const [mediaUrls, setMediaUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_HOST_URL}${path}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
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
              pets: responseData.meta.pets,
            },
            location: {
              address: responseData.address,
              city: responseData.city,
              zip: responseData.zip,
              country: responseData.country,
              continent: responseData.continent,
              lat: responseData.lat,
              lng: responseData.lng,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchData();
  }, [reset, path, authToken]);

  const handleEditVenue = async () => {
    try {
      const updatedData = { ...data };
      updatedData.media = mediaUrls;

      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        alert("updated");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const addMediaUrl = (url, index) => {
    const updatedMediaUrls = [...mediaUrls];
    updatedMediaUrls[index] = url;
    setMediaUrls(updatedMediaUrls);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-['Playfair_Display_SC']">
        Update Venue
      </h1>
      <form onSubmit={handleSubmit(handleEditVenue)}>
        <div>
          <div>
            <label htmlFor="name">Name of venue:</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                  {...field}
                  required
                  type="text"
                />
              )}
            />
          </div>
          <div>
            <label htmlFor="description">
              Describe the venue:
              <span className="opacity-50"> (location, facilities, etc)</span>
            </label>
            <Controller
              name="description"
              control={control}
              value={description}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  className="bg-background border-b border-accent ml-2 px-2 leading-tight h-auto"
                  {...field}
                  required
                  type="text"
                  onChange={(e) => {
                    handleDescriptionChange(e);
                    field.onChange(e);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div>
          <label htmlFor="media">Media</label>
          {[1, 2, 3].map((index) => (
            <Controller
              name={`media-${index}`}
              control={control}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                  {...field}
                  onChange={(e) => addMediaUrl(e.target.value, index - 1)}
                  type="url"
                  required={index === 1}
                />
              )}
            />
          ))}
        </div>

        <div>
          <label htmlFor="rating">Rating:</label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <input
                className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                {...field}
                type="number"
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="price">Price per night in NOK:</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input
                className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                {...field}
                required
                type="number"
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="maxGuests">Max guests:</label>
          <Controller
            name="maxGuests"
            control={control}
            render={({ field }) => (
              <input
                className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                {...field}
                type="number"
                required
              />
            )}
          />
        </div>
        <div>
          <div>
            <label htmlFor="wifi">Wifi:</label>
            <Controller
              name="wifi"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label htmlFor="parking">Parking:</label>
            <Controller
              name="parking"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label htmlFor="breakfast">Breakfast:</label>
            <Controller
              name="breakfast"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label htmlFor="pets">Pets:</label>
            <Controller
              name="pets"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
        </div>

        <div>
          <button disabled={isSubmitting} className="bg-cta" type="Submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
