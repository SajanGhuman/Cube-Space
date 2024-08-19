"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "../components/button"; // Assuming you have a Button component
import { ButtonBase } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { email, password, name });
      setSuccess("User created successfully");
      setTimeout(() => {
        router.push("/signIn");
      }, 1000);
    } catch (error: any) {
      console.error("Error registering user:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8 min-h-screen">
      <div className="flex flex-col items-center justify-center border border-text-green space-y-8 p-8 bg-grey rounded-xl shadow-lg sm:w-[500px] md:w-[600px]">
        <div className="relative mb-4">
          <img
            src="/CUBE.png"
            alt="Cube"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white text-center">
          Register for an account
        </h1>
        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border bg-background-green-dark border-text-green placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border bg-background-green-dark border-text-green placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border bg-background-green-dark border-text-green placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border-[2px] border-text-green text-sm font-medium rounded-md text-white bg-background-green-dark hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Register
          </button>
        </form>
        {error && (
          <div
            className="z-10 border-1 border-t border-b border-[#EE4B2B] text-[#EE4B2B] px-4 py-3 mt-4"
            role="alert"
          >
            <p className="font-semibold">Error!</p>
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}
        {success && (
          <p className="text-center text-sm text-white bg-text-green px-4 py-3 mt-4">
            {success}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
