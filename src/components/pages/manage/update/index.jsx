import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";
import { Helmet } from "react-helmet";

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
    const updatedData = { ...data };

    updatedData.meta = {
      wifi: updatedData.meta.wifi,
      parking: updatedData.meta.parking,
      breakfast: updatedData.meta.breakfast,
      pets: updatedData.meta.pets,
    };

    updatedData.location = {
      address: updatedData.location.address,
      city: updatedData.location.city,
      zip: updatedData.location.zip,
      country: updatedData.location.country,
      continent: updatedData.location.continent,
      lat: parseFloat(updatedData.location.lat),
      lng: parseFloat(updatedData.location.lng),
    };

    try {
      updatedData.media = mediaUrls;

      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      console.log("Response:", response);
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
      <Helmet>
        <title>Update | VenueVista</title>
        <meta name="description" content="Update your venue at VenueVista" />
      </Helmet>
      <h1 className="text-xl md:text-2xl font-['Playfair_Display_SC']">
        Update Venue
      </h1>
      <form
        onSubmit={handleSubmit(handleEditVenue)}
        className="flex flex-col text-center"
      >
        <div className="flex flex-col">
          <div className="mt-8 md:mt-2">
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
          <div className="mt-2">
            <label htmlFor="description ">
              Describe the venue:
              <span className="opacity-50 text-xs">
                (location, facilities, etc)
              </span>
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
        <div className="mt-6">
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
        <div className="flex flex-col mt-6 md:flex-row justify-center">
          <div>
            <label htmlFor="rating">Rating:</label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight w-10"
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
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight w-16"
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
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight w-10"
                  {...field}
                  type="number"
                  required
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center mt-6">
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
          </div>
          <div className="flex flex-col">
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
        </div>
        <div className="mt-6">
          <div>
            <div>
              <div>
                <label htmlFor="country">Country</label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                      {...field}
                      type="text"
                    />
                  )}
                />
              </div>
              <div>
                <label htmlFor="continent">Continent</label>
                <Controller
                  name="continent"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                      {...field}
                      type="text"
                    />
                  )}
                />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label htmlFor="city">City</label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                      {...field}
                      type="text"
                    />
                  )}
                />
              </div>
              <div>
                <label htmlFor="zip">Zip</label>
                <Controller
                  name="zip"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                      {...field}
                      type="text"
                    />
                  )}
                />
              </div>
              <div>
                <label htmlFor="Address">Address</label>
                <Controller
                  name="Address"
                  control={control}
                  render={({ field }) => (
                    <input
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                      {...field}
                      type="text"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:justify-center">
            <div>
              <label htmlFor="lat">Latitude</label>
              <Controller
                name="lat"
                control={control}
                render={({ field }) => (
                  <input
                    required
                    className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                    {...field}
                    type="number"
                  />
                )}
              />
            </div>
            <div className="md:ml-5">
              <label htmlFor="lng">Longitude</label>
              <Controller
                name="lng"
                control={control}
                render={({ field }) => (
                  <input
                    required
                    className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                    {...field}
                    type="number"
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            disabled={isSubmitting}
            className="rounded-md mt-2 bg-cta border-cta border  text-white text-sm p-1 hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary"
            type="Submit"
          >
            Update post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
