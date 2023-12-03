import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { API_HOST_URL } from "../../../storage/constants";
import { Helmet } from "react-helmet";
import { useAuth } from "../../../storage/authentication";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit, control, setValue } = useForm();
  const [description, setDescription] = useState();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`${API_HOST_URL}/venues/${id}`);
        const venue = await response.json();
        setValue("name", venue.name);
        setValue("description", venue.description);
        setValue("price", venue.price);
        setValue("maxGuests", venue.maxGuests);
        setValue("rating", venue.rating);
        setValue("media-1", venue.media[0] || "");
        setValue("media-2", venue.media[1] || "");
        setValue("media-3", venue.media[2] || "");
        setValue("wifi", venue.meta.wifi || false);
        setValue("parking", venue.meta.parking || false);
        setValue("breakfast", venue.meta.breakfast || false);
        setValue("pets", venue.meta.pets || false);
        setValue("country", venue.location.country);
        setValue("continent", venue.location.continent || "");
        setValue("city", venue.location.city || "");
        setValue("zip", venue.location.zip || "");
        setValue("address", venue.location.address || "");
        setValue("location.lat", venue.location.lat || "");
        setValue("location.lng", venue.location.lng || "");
      } catch {
        console.error("error", error);
      }
    };
    fetchVenueDetails();
  }, [id, setValue]);

  const handleEditVenue = async (data) => {
    try {
      if (!isAuthenticated) {
        console.error("User not authenticated");
        navigate("/login");
        return;
      }
      const locationFields = {
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country,
        continent: data.continent,
        lat: parseFloat(data.location.lat),
        lng: parseFloat(data.location.lng),
      };

      const requestData = {
        ...data,
        location: locationFields,
      };

      console.log("Data object before fetch:", data);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_HOST_URL}/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const updatedVenue = await response.json();
        console.log("Venue updated successfully:", updatedVenue);
        // Optionally, you can redirect to the updated venue or another page
        navigate(`/venues/${id}`);
      } else {
        console.error("Error updating venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const addMediaUrl = (url, index) => {
    setValue(`media-${index + 1}`, url);
    // Implement other logic if needed
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setValue("description", newDescription);
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
                <label htmlFor="address">Address</label>
                <Controller
                  name="address"
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
                name="location.lat"
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
            <div className="md:ml-5">
              <label htmlFor="lng">Longitude</label>
              <Controller
                name="location.lng"
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
          </div>
        </div>
        <div className="mt-4">
          <button
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
