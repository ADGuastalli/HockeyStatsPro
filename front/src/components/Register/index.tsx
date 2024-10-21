"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateRegister } from "../../helper/loginUser";
import { IErrorsRegister } from "../../interface/interface";
import { UserContext } from "../../context/userContext";
import eye from "../../app/public/svg/eye-svgrepo-com.svg";
import eyeClouse from "../../app/public/svg/eye-slash-svgrepo-com.svg";
import Image from "next/image";
import Swal from "sweetalert2";
import { Input } from "../ui/Input";
import { getAllClubes } from "../../server/fetchClubes"; // Importar función para obtener clubes

export default function RegisterComponent() {
  const { register } = useContext(UserContext);
  const router = useRouter();

  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    club: "", // Club seleccionado
    category: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IErrorsRegister>({
    nombre: "",
    email: "",
    club: "",
    category: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [clubes, setClubes] = useState([]); // Estado para almacenar los clubes

  // Obtener clubes al montar el componente
  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const clubesData = await getAllClubes();

        setClubes(clubesData);
      } catch (error) {
        console.error("Error al obtener los clubes:", error);
      }
    };

    fetchClubes();
  }, []);

  const todosLosCamposCompletos = () => {
    return (
      userData.nombre &&
      userData.email &&
      userData.club && // Verificar si se seleccionó un club
      userData.category &&
      userData.password &&
      userData.confirmPassword
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newUserData = { ...userData, [name]: value };

    setUserData(newUserData);
    setErrors(
      validateRegister(newUserData, [
        "nombre",
        "club",
        "category",
        "email",
        "password",
        "confirmPassword",
      ])
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
        customClass: {
          confirmButton: "button-error",
        },
      });
    } else {
      const userDataToSubmit = {
        email: userData.email,
        password: userData.password,
        nombre: userData.nombre,
        club: userData.club,
        category: userData.category,
      };
      console.log("datos que envio", userDataToSubmit);

      try {
        const success = await register(userDataToSubmit);
        console.log("success", success);

        if (success) {
          Swal.fire({
            icon: "success",
            title: "¡Registrado con éxito!",
            text: "Usuario registrado exitosamente, por favor ingresar con sus credenciales",
            customClass: {
              confirmButton: "button-principal",
            },
          }).then(() => {
            router.push("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al registrar usuario",
            customClass: {
              confirmButton: "button-error",
            },
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en el servidor, por favor intente nuevamente",
          customClass: {
            confirmButton: "button-error",
          },
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {[
          { name: "nombre", placeholder: "Nombre" },
          { name: "category", placeholder: "Categoría" },
          { name: "email", placeholder: "Email" },
          {
            name: "password",
            placeholder: "Password",
            type: showPassword ? "text" : "password",
            toggleShow: () => setShowPassword((prev) => !prev),
          },
          {
            name: "confirmPassword",
            placeholder: "Confirmar Password",
            type: showConfirmPassword ? "text" : "password",
            toggleShow: () => setShowConfirmPassword((prev) => !prev),
          },
        ].map(({ name, placeholder, type = "text", toggleShow }) => (
          <div
            key={name}
            className="relative flex flex-col items-start rounded"
          >
            <Input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={handleInputChange}
            />
            {name === "password" || name === "confirmPassword" ? (
              <button
                type="button"
                onClick={toggleShow}
                className="absolute right-3 top-6 mr-2 text-gray-600"
              >
                <Image
                  src={type === "password" ? eyeClouse : eye}
                  alt="Toggle visibility"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </button>
            ) : null}
            <div className="h-[1rem] w-full">
              {errors[name as keyof IErrorsRegister] && (
                <p className="text-red-600 text-xs text-left pl-3 mt-1">
                  {errors[name as keyof IErrorsRegister]}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Select para Club */}
        <div className="relative flex flex-col items-start rounded">
          <select
            name="club"
            id="club"
            value={userData.club}
            onChange={handleInputChange}
            className="bg-white focus:outline-none focus:ring focus:ring-secondary border 
             border-gray-300 rounded-lg py-4 pl-8 text-lg px-4 mx-2 my-2 block w-96 appearance-none leading-normal
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          >
            <option value="">Seleccione un club</option>
            {clubes.map((club: any) => (
              <option key={club.id} value={club.id}>
                {club.nombre}
              </option>
            ))}
          </select>
          <div className="h-[1rem] w-full">
            {errors.club && (
              <p className="text-red-600 text-xs text-left pl-3 mt-1">
                {errors.club}
              </p>
            )}
          </div>
        </div>
      </div>

      {!todosLosCamposCompletos() && (
        <p className="text-red-600 text-xs text-left pl-3 min-h-[1rem] mt-3">
          * Todos los campos son requeridos
        </p>
      )}

      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className={`relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 md:py-3 px-10 sm:px-16 md:px-20 rounded-full uppercase flex items-center justify-center ${
            !todosLosCamposCompletos() && "opacity-50 cursor-not-allowed"
          }`}
          data-twe-ripple-init
          data-twe-ripple-color="light"
          disabled={!todosLosCamposCompletos()}
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}
