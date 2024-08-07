"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "../components/button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("Logged in successfully");
      setTimeout(() => {
        router.push("/");
      });
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center border border-text-green space-y-8 p-8 bg-grey rounded-xl shadow-lg sm:w-[500px] md:w-[600px]">
          <div className="relative mb-4">
            <img
              src="/CUBE.png"
              alt="Cube"
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white text-center">
            Sign in to your account
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
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/resetPass"
                  className="font-medium text-white hover:text-orange-500"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="bg-background-green-dark border-2 border-text-green w-full py-2 px-4 text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Login
            </button>
          </form>
          {error && (
            <div
              className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mt-4"
              role="alert"
            >
              <p className="font-bold">Warning!</p>
              <p className="text-sm">
                Username/password combination incorrect. Please try again.
              </p>
            </div>
          )}
          {success && (
            <p className="mt-2 text-center text-sm text-green-600">{success}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
