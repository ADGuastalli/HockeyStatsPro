"use client";
import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";
import Image from "next/image";
import ImgPalo from "../../app/public/svg/field-hockey (1).png";
import Link from "next/link";

export default function InicioComponet() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {isAuthenticated ? (
        <Link href="/MisPartidos">
          <button className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 md:py-3 px-10 sm:px-16 md:px-20 rounded-full uppercase flex items-center justify-center">
            Mis Partidos
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
      ) : (
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
      )}
    </div>
  );
}
