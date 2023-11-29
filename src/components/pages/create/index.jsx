import React, { useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../storage/authentication";
import { Helmet } from "react-helmet";

function Create() {
  const path = "/venues";
  const { control, handleSubmit, formState } = useForm({
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
  const [mediaUrls, setMediaUrls] = useState([]);
  const { isSubmitting } = formState;
  const { isAuthenticated } = useAuth();
  const authToken = isAuthenticated ? localStorage.getItem("token") : null;
  const onSubmit = async (data) => {
    data.media = mediaUrls;
    data.price = parseFloat(data.price);
    data.maxGuests = parseFloat(data.maxGuests);
    data.rating = parseFloat(data.rating);

    try {
      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Post successfully created");
      } else {
        console.error("Creating post failed");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const addMediaUrl = (url) => {
    setMediaUrls([...mediaUrls, url]);
  };

  return (
    <div>
      <Helmet>
        <title>Create | VenueVista</title>
        <meta
          name="description"
          content="Create a venue at VenueVista to rent it out"
        />
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  className="bg-background border-b border-accent ml-2 px-2 leading-tight h-auto"
                  {...field}
                  required
                  type="text"
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
              <label htmlFor="latitude">Latitude</label>
              <Controller
                name="latitude"
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
            <div className="md:ml-5">
              <label htmlFor="longitude">Longitude</label>
              <Controller
                name="longitude"
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
        <div className="mt-4">
          <button
            disabled={isSubmitting}
            className="bg-cta text-white ml-2 text-sm p-1 rounded-md"
            type="Submit"
          >
            Update post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
