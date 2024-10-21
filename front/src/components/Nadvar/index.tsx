"use client";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2"; // Importar SweetAlert2
import ImagMenu from "../../app/public/svg/field-hockey PNG.svg";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(UserContext);

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Función para manejar el logout con confirmación
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Quieres cerrar sesión!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F77354",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      logout(); // Llama a la función de logout si el usuario confirma
    }
  };

  // Función para manejar clics en los enlaces del menú
  const handleLinkClick = () => {
    setIsMenuOpen(false); // Cerrar el menú
  };

  return (
    <div className="navbar bg-blue-500/60 rounded-full absolute w-10 h-5 flex justify-center ml-3 mt-3">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
          <Image src={ImagMenu} alt="Logo" width={25} height={25} />
        </button>
      </div>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute top-16 left-24 transform -translate-x-1/2 w-48 bg-blue-500/90 shadow-lg rounded-lg flex flex-col p-2 mt-2">
          <Link
            href="/"
            className="block px-4 py-2 text-white font-bold hover:bg-gray-200 w-full text-left"
            onClick={handleLinkClick} // Agregar evento de clic
          >
            Inicio
          </Link>

          <Link
            href="/MisPartidos"
            className="block px-4 py-2 text-white font-bold hover:bg-gray-200 w-full text-left"
            onClick={handleLinkClick} // Agregar evento de clic
          >
            Mis partidos
          </Link>
          <Link
            href="/Match"
            className="block px-4 py-2 text-white font-bold hover:bg-gray-200 w-full text-left"
            onClick={handleLinkClick} // Agregar evento de clic
          >
            Iniciar un Partido
          </Link>
          {isAuthenticated && (
            <button
              className="font-bold rounded-xl bg-[#F77354] text-white px-4 py-2 m-2 text-sm 
                        transition-transform duration-300 transform hover:scale-105"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
    </div>
  );
};
