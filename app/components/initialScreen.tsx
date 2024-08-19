"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./useMousePosition";

const InitialScreen = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 300 : 40;
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div
        role="status"
        className="flex justify-center items-center h-screen w-screen p-4"
      >
        <svg
          aria-hidden="true"
          className="w-16 h-16 md:w-24 md:h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen p-4">
      <motion.div
        className="hidden lg:flex absolute top-[-100px] w-full h-full  items-center justify-center text-center text-white text-[70px] font-bold leading-none cursor-default bg-background-green"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2 + 100}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        style={{
          WebkitMaskImage: "url('/mask.svg')",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "400px",
          backgroundColor: "#5F7470",
        }}
      >
        <p
          className="max-w-4xl p-10"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          I AM SO NOOB
          <br/>
          I SHOULD CUBE
        </p>
      </motion.div>
      <h1 className="text-5xl md:text-8xl text-text-green font-bold text-center sm:text-7xl lg:text-9xl xl:text-[100px] 2xl:text-[110px]">
        CUBE SPACE
      </h1>
      <span className="relative top-[20px] text-2xl sm:top-[10px] text-text-green md:text-3xl sm:text-[30px] font-bold text-center lg:text-4xl xl:text-5xl 2xl:text-[40px]">
        WANT TO CUBE?
        <span className="relative top-[10px] block text-lg md:text-2xl text-white font-bold sm:text-[10px] lg:text-[30px] xl:text-[40px] 2xl:text-[40px]">
          YOU ARE AT THE RIGHT PLACE.
        </span>
      </span>
      <button
        onClick={() => router.push("/category")}
        className="relative top-[10px] text-white bg-background-green-dark border-3 border-[5px] sm:top-[20px] md:border-5 border-text-green rounded-full p-4 md:p-6 mt-4 md:mt-6"
      >
        Algorithms
      </button>
    </div>
  );
};

export default InitialScreen;
