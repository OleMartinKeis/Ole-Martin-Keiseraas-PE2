import React, { useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../storage/authentication";

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name of venue:</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input className="text-text" {...field} required type="text" />
            )}
          />
        </div>
        <div>
          <label>
            Describe the venue:
            <span className="opacity-50">(location, facilities, etc)</span>
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <input className="text-text" {...field} required type="text" />
            )}
          />
        </div>
        <div>
          <label>Media</label>
          <Controller
            name="media-1"
            control={control}
            render={({ field }) => (
              <input
                className="text-text"
                {...field}
                onChange={(e) => addMediaUrl(e.target.value)}
                type="url"
                required
              />
            )}
          />
        </div>
        <div>
          <label>Media</label>
          <Controller
            name="media-2"
            control={control}
            render={({ field }) => (
              <input className="text-text" {...field} type="url" />
            )}
          />
        </div>
        <div>
          <label>Media</label>
          <Controller
            name="media-3"
            control={control}
            render={({ field }) => (
              <input className="text-text" {...field} type="url" />
            )}
          />
        </div>
        <div>
          <label>Rating:</label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <input className="text-text" {...field} type="number" />
            )}
          />
        </div>
        <div>
          <label>Price per night in NOK:</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <input className="text-text" {...field} required type="number" />
            )}
          />
        </div>
        <div>
          <label>Max guests:</label>
          <Controller
            name="maxGuests"
            control={control}
            render={({ field }) => (
              <input className="text-text" {...field} type="number" required />
            )}
          />
        </div>
        <div>
          <div>
            <label>Wifi:</label>
            <Controller
              name="wifi"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label>Parking:</label>
            <Controller
              name="parking"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label>Breakfast:</label>
            <Controller
              name="breakfast"
              control={control}
              render={({ field }) => (
                <input className="text-text" {...field} type="checkbox" />
              )}
            />
          </div>
          <div>
            <label>Pets:</label>
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

export default Create;
