import React from "react";
import Image from "next/image";
import ImgLogo2 from "./public/svg/Logo2.png";
import ImgLogo from "./public/svg/Logo.png";
import InicioComponet from "@/components/Inicio";
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
      <InicioComponet />
    </div>
  );
}
