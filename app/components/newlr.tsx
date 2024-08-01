"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NewLr = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="absolute top-4 right-4">
      {status === "unauthenticated" ? (
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/signIn")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      ) : (
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default NewLr;
