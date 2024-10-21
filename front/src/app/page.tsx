import React from "react";
import Image from "next/image";
import ImgLogo2 from "./public/svg/Logo2.png";
import ImgLogo from "./public/svg/Logo.png";
import ImgPalo from "./public/svg/field-hockey PNG.svg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-5 mb-20">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={ImgLogo}
          alt="Logo"
          width={500}
          height={500}
          className="mt-5 w-[60%] sm:w-[500px]"
        />
        <Image
          src={ImgLogo2}
          alt="Logo"
          width={400}
          height={400}
          className="mt-5 w-[60%] sm:w-[400px]"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <Link href="/login">
          <button className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 md:py-3 px-10 sm:px-16 md:px-20 rounded-full uppercase flex items-center justify-center">
            Ingresar
            <span className="absolute right-2 sm:right-4 md:right-6">
              <Image
                src={ImgPalo}
                alt="Logo"
                width={40}
                height={40}
                className="w-[25px] sm:w-[25px] md:w-[30px]"
              />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
