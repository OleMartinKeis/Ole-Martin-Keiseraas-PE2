import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { API_HOST_URL } from "../../storage/constants";
import Logout from "../../storage/logout/logout";

function Profile() {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = localStorage.getItem("token");
  const [showBookings, setShowBookings] = useState(false);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      venueManager: false,
    },
  });

  const path = `/profiles/${user.name}/media`;

  const [bookings, setBookings] = useState([]);

  const handleShowBookings = async (data) => {
    if (showBookings) {
      setShowBookings(false);
    } else {
      try {
        const response = await fetch(
          `${API_HOST_URL}/profiles/${user.name}?_bookings=true`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings || []);
          setShowBookings(true);
        } else {
          console.error("Fetching bookings failed");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const updatedUser = { ...user, avatar: data.avatar };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <div className="relative h-550px">
        <div
          className="shadow-2xl inset-0 bg-cover bg-center text-center border-b border-accent"
          style={{
            backgroundImage: 'url("../src/assets/profilepage.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "550px",
            margin: " 0 0",
          }}
          alt="If there was a banner option in the Api it would go here."
        >
          <h1 className="text-2xl m-auto mb-3 font-['Playfair_Display_SC']">
            Welcome back {user.name}
          </h1>
          <img
            src={user.avatar}
            alt={`${user.name} Avatar`}
            className="w-32 h-32 border-4 border-accent md:w-64 md:h-64 rounded-full shadow-xl absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4"
          />
        </div>
      </div>
      <div className="flex  md:mt-16 mt-10">
        <div className="flex flex-col m-auto">
          <div className="pb-2 pt-0 md:max-w-md rounded-xl text-black m-auto">
            <div className="ml-2 mt-5 mb-5 text-white">
              <div>
                <label>
                  <span className="sr-only">Your username:</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      placeholder={`${user.name}`}
                      {...field}
                      disabled
                      required
                      type="text"
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                    />
                  )}
                />
              </div>
              <div>
                <label>
                  <span className="sr-only">Your email:</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      placeholder={`${user.email}`}
                      disabled
                      {...field}
                      required
                      type="text"
                      className="bg-background border-b border-accent ml-3 px-2 leading-tight"
                    />
                  )}
                />
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  align-middle md:ml-2">
            <button
              className="rounded-md mt-2 bg-cta  text-white text-sm p-1 hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary"
              onClick={handleShowBookings}
            >
              {showBookings ? "Hide My Bookings" : "Show My Bookings"}
            </button>

            <div className="flex flex-col mt-2 ">
              {showBookings &&
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="mt-2 bg-primary text-text md:pl-2 pb-1 md:pr-2 rounded-md border-accent border-t-2 border-b-2 shadow-2xl"
                  >
                    <div className="flex flex-row">
                      <img
                        src={booking.venue.media[0]}
                        className="max-w-16  max-h-16 flex-col mt-auto mb-auto shadow-2xl"
                      />
                      <div className="flex flex-col md:flex-col md:ml-3">
                        <p>
                          <strong>Date from:</strong>
                          {formatDate(booking.dateFrom)}
                        </p>
                        <p>
                          <strong>Date to:</strong> {formatDate(booking.dateTo)}
                        </p>
                        <div className="text-xs">
                          <p>
                            <strong>Venue Name:</strong> {booking.venue.name}
                          </p>
                          <p>
                            <strong>Booking ID:</strong> {booking.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="p-3 flex"></div>
          <div className="ml-2">
            <h3 className="text-xl">Update avatar</h3>
            <p className="truncate max-w-[550px]">
              Current avatar:{" "}
              <span className="bg-background border-b border-accent ml-3 px-2 leading-tight text-sm">
                {user.avatar}
              </span>
            </p>
            <label htmlFor="avatar">Avatar:</label>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="url"
                  className="bg-background border-b border-accent ml-3 px-2 leading-tight  text-sm"
                />
              )}
            />
            <div className="">
              <button className="rounded-md mt-2 h-8 w-32 bg-cta text-white text-sm hover:border-accent hover:border hover:shadow-lg hover:text-background hover:bg-primary">
                Update avatar
              </button>
            </div>
          </div>
        </form>

        <div className="ml-2 pb-8 mt-4">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Profile;
