import React, { useState } from "react";
import { API_HOST_URL } from "../../storage/constants";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const path = "/auth/register";

function Register() {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
      venueManager: false,
    },
  });
  const { isSubmitting } = formState;

  const toLogin = useNavigate();

  const handleButtonClick = (event) => {
    event.preventDefault();
  };
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_HOST_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toLogin("/login");
      } else {
        const errorData = await response.json();

        if (errorData.errors && errorData.errors.length > 0) {
          const fieldErrors = {};
          errorData.errors.forEach((error) => {
            const fieldName = error.path[0];
            fieldErrors[fieldName] = error.message;
          });
          setRegistrationError(fieldErrors);
        } else {
          setRegistrationError(errorData.message || "Registration failed");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      setRegistrationError("An unexpected error occured");
    }
  };

  const handleCheckBoxChange = () => {
    setIsVenueManager(!isVenueManager);
  };

  return (
    <div>
      <h1 className="sm:text-lg md:text-xl lg:text-2xl text-center pt-6 font-['Playfair_Display_SC'] ">
        Your dream location is just a few steps away
      </h1>
      <div className="flex flex-col justify-center items-center content-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="sm:flex mb-4">
            <label htmlFor="name" className="mr-2 w-20">
              Name:
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent px-2 leading-tight"
                  {...field}
                  required
                  type="text"
                />
              )}
            />
          </div>
          <div className="sm:flex mb-4">
            <label htmlFor="email" className="mr-2 w-20">
              Email:{" "}
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@stud\.noroff\.no$/,
                  message: "Invalid email format. Please use @stud.noroff.no",
                },
              }}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent px-2 leading-tight"
                  {...field}
                  required
                  type="text"
                />
              )}
            />
          </div>
          <div className="sm:flex mb-4">
            <label htmlFor="password" className="mr-2 w-20">
              Password:
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent px-2 leading-tight"
                  {...field}
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div className="sm:flex mb-2">
            <label htmlFor="avatar" className="mr-2 w-20">
              Avatar:
            </label>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent px-2 leading-tight"
                  {...field}
                  type="url"
                />
              )}
            />
          </div>
          <div className="sm:flex mb-2">
            <label htmlFor="venueManager" className="mr-2 w-20">
              Venue Manager:
            </label>
            <Controller
              name="venueManager"
              control={control}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent px-2 leading-tight"
                  {...field}
                  type="checkbox"
                  checked={isVenueManager}
                  onChange={handleCheckBoxChange}
                />
              )}
            />
          </div>
          <div>
            {isVenueManager && (
              <p className=" opacity-70 text-xs ">
                By pressing Venue Manager you agree to the
                <a href="" className=" border-b border-accent">
                  {" "}
                  Terms & Service
                </a>
              </p>
            )}
          </div>
          <div className="">
            {registrationError && (
              <div className="bg-text p-1 rounded-md border-accent border text-center">
                {Object.keys(registrationError).map((fieldName) => (
                  <p key={fieldName} className="text-sm text-red-500">
                    {registrationError[fieldName]}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className="bg-cta text-white mt-1 text-sm p-1 rounded-md"
              type="Submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="ml-1 mt-8 w-100">
          <h2 className="text-2xl font-['Playfair_Display_SC'] mb-1 md:mb-4">
            FAQ
          </h2>
          <div className="border-accent border-b w-100 p-4 mb-4">
            <h3 className="sm:text-base md:text-xl">What is VenueVista?</h3>
            <p className="px-2 text-xs sm:text-sm md:text-base">
              VenueVista is a school project for Noroffs Exam for Front-end
              Developers
            </p>
          </div>
          <div className="border-b border-accent w-100 p-4">
            <h3 className="sm:text-base md:text-xl">Who created VenueVista?</h3>
            <p className="px-2 text-xs sm:text-sm md:text-base">
              VenueVista is created by Ole Martin Keiseraas, check out my
              <a
                className="border-b border-accent"
                href="https://github.com/OleMartinKeis"
              >
                Github
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
