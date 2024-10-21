import React from "react";
import RegisterComponet from "@/components/Register";
import ButtonBack from "@/components/ui/buttons";
import Link from "next/link";
import Image from "next/image";
import ImgLogo2 from "../public/svg/Logo2.png";

export default function RegisterPage() {
  return (
    <div>
      <div className="mt-2 ml-2">
        <Link href="/login">
          <ButtonBack />
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          src={ImgLogo2}
          alt="Logo"
          width={400}
          height={400}
          className="mt-5 w-[60%] sm:w-[400px] mb-10"
        />
        <RegisterComponet />
      </div>
    </div>
  );
}
