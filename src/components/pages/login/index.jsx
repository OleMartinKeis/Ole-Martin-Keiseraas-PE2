import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_HOST_URL } from "../../storage/constants";
import { useAuth } from "../../storage/authentication";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const path = "/auth/login";

function Login() {
  const [loginError, setLoginError] = useState(null);

  const { setIsAuthenticated } = useAuth();

  const toHome = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting } = formState;

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
        const responseData = await response.json();
        const user = {
          name: responseData.name,
          email: responseData.email,
          avatar: responseData.avatar,
          venueManager: responseData.venueManager,
        };

        localStorage.setItem("token", responseData.accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        toHome("/");
      } else {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          const fieldErrors = {};
          errorData.errors.forEach((error) => {
            const fieldName = error.path ? error.path[0] : "nonFieldError";
            fieldErrors[fieldName] = error.message;
          });
          setLoginError(fieldErrors);
        } else {
          setLoginError(errorData.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      setLoginError("An unexpected error occured");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center content-center h-screen">
      <Helmet>
        <title>Log in | VenueVista</title>
        <meta name="description" content="Login to VenueVista" />
      </Helmet>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mb-8"
        >
          <div className="flex gap-5 ml-2 mb-4">
            <label className="pr-2" htmlFor="email">
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  className="bg-background border-b border-accent w-full  px-2 pr-4 leading-tight"
                  {...field}
                  required
                  type="text"
                />
              )}
            />
          </div>
          <div className="flex mb-5">
            <label className=" ml-2 w-20" htmlFor="password">
              Password:
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="bg-background border-b border-accent px-2 leading-tight"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div className="">
            {loginError && (
              <div className="bg-text p-1 rounded-md border-accent border text-center">
                {Object.keys(loginError).map((fieldName) => (
                  <p key={fieldName} className="text-sm text-red-500">
                    {loginError[fieldName]}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className=" w-full bg-cta p-1 rounded-md"
              type="Submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex flex-col mt-8">
          <p className="mb-2">
            Still not a member, or want to create a Venue Manager* account?{" "}
            <Link
              className="border-accent border-b text-gray-200"
              to="/register"
            >
              Click here to register
            </Link>
            <span className="opacity-50 text-sm ml-2">
              *To rent out a venue, you need a Venue Manager account
            </span>
          </p>
        </div>
      </div>
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
            <span> </span>
            <a
              className="border-b border-accent hover:text-primary"
              href="https://github.com/OleMartinKeis"
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
