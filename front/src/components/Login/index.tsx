"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ILogin, IErrorsLogin } from "@/interface/interface";
import { UserContext } from "../../context/userContext";
import { validateLogin } from "../../helper/loginUser";
import eye from "../../app/public/svg/eye-svgrepo-com.svg";
import eyeClose from "../../app/public/svg/eye-slash-svgrepo-com.svg";
import Image from "next/image";
import { Input } from "../ui/Input";
import Link from "next/link";

export default function LoginComponent() {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState<ILogin>({ email: "", password: "" });
  const [errors, setErrors] = useState<IErrorsLogin>({
    email: "*",
    password: "*",
  });
  const [showPassword, setShowPassword] = useState(false);

  const todosLosCamposRequeridos = () => {
    return userData.email !== "" && userData.password !== "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newUserData = { ...userData, [name]: value };
    setUserData(newUserData);
    setErrors(validateLogin(newUserData, ["email", "password"]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const success = await login(userData);
      if (success) {
        Swal.fire({
          title: "¡Login Exitoso!",
          text: "Serás redirigido en 2 segundos...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          router.push("/MisPartidos");
        }, 2000);
      } else {
        Swal.fire({
          title: "Error",
          text: "Usuario o contraseña no encontrados.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
          customClass: {
            confirmButton: "button-error",
          },
        });
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: "button-error",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-6 flex flex-col items-center justify-center rounded">
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleInputChange}
        />
        <div className="h-4 w-full">
          {errors.email && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="relative mb-6 flex flex-col items-center rounded">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-6 mr-2 text-gray-600"
        >
          <Image
            src={showPassword ? eye : eyeClose}
            alt="Toggle visibility"
            className="w-6 h-6"
          />
        </button>
        <div className="h-4 w-full">
          {errors.password && (
            <p className="text-red-600 text-xs text-left w-full pl-3 mt-1">
              {errors.password}
            </p>
          )}
        </div>
      </div>
      <div className="h-4">
        {!todosLosCamposRequeridos() && (
          <p className="text-red-600 text-xs text-left w-full pl-3">
            * Todos los campos son requeridos
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <button
          type="submit"
          className={`${
            !todosLosCamposRequeridos() ? "bg-gray-400" : "bg-blue-600"
          } text-white rounded-md p-2`}
          disabled={!todosLosCamposRequeridos()}
        >
          Ingresar
        </button>
        <p className="text-sm text-center mt-5">
          ¿No tienes cuenta?
          <Link href="/register" className="mt-2 ">
            <span className="ml-2 text-blue-500"> Regístrate aquí</span>
          </Link>
        </p>
      </div>
    </form>
  );
}
