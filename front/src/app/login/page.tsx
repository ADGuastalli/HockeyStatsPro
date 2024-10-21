import React from "react";
import LoginComponet from "@/components/Login";
import Image from "next/image";
import ImgLogo from "../public/svg/Logo.png";

export default function Login() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          src={ImgLogo}
          alt="Logo"
          width={400}
          height={400}
          className="mt-5 w-[60%] sm:w-[400px] mb-10"
        />
        <LoginComponet />
      </div>
    </div>
  );
}
