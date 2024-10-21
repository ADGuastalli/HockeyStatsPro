"use client";
import React, { useState, useEffect, useContext } from "react";
import style from "./partido.module.css";
import Image from "next/image";
import ImagenBocha from "../../app/public/svg/ball.png";
import { getAllClubes } from "@/server/fetchClubes";
import { getAllTorneos } from "@/server/fetchTorneo";
import { createPartido } from "@/server/fetchPartidos";
import { UserContext } from "@/context/userContext";

export const PartidoComponent = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(true); // Mostrar el modal inicialmente
  const [clubes, setClubes] = useState<any[]>([]);
  const [torneos, setTorneos] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0], // Fecha actual
    fechaTorneo: "",
    clubId: "",
    torneoId: "",
    usuarioId: user?.usuario.id,
  });

  // Obtener clubes y torneos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubesData = await getAllClubes();
        const torneosData = await getAllTorneos();
        setClubes(clubesData);
        setTorneos(torneosData);
      } catch (error) {
        console.error("Error fetching clubes or torneos:", error);
      }
    };
    fetchData();
  }, []);

  // Manejar el cambio en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPartido(formData);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating partido:", error);
    }
  };

  // Números donde se quieren agregar botones
  const buttonPositions = [3, 7, 72, 85, 241, 267, 345, 349];

  return (
    <div className={style.conteiner}>
      {/* Modal */}
      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modal}>
            <form onSubmit={handleSubmit} className={style.form}>
              <label className="font-bold">
                Fecha del Partido:
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#0095a9] dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ml-5"
                />
              </label>

              <label className="font-bold">
                Fecha Torneo:
                <input
                  type="text"
                  name="fechaTorneo"
                  value={formData.fechaTorneo}
                  onChange={handleChange}
                  placeholder="Ej: Fecha 1"
                  className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#0095a9] dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ml-5"
                />
              </label>

              <label className="font-bold">
                Selecciona Rival:
                <select
                  name="clubId"
                  value={formData.clubId}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#0095a9] dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ml-5"
                >
                  <option value="">Selecciona un club</option>
                  {clubes.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label className="font-bold">
                Selecciona el Torneo:
                <select
                  name="torneoId"
                  value={formData.torneoId}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#0095a9] dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ml-5"
                >
                  <option value="">Selecciona un torneo</option>
                  {torneos.map((torneo) => (
                    <option key={torneo.id} value={torneo.id}>
                      {torneo.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md p-2 mt-5 w-full"
              >
                Crear Partido
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Grid que se mostrará solo después de crear el partido */}
      {!showModal && (
        <div className={style.gridContainer}>
          {Array.from({ length: 351 }).map((_, index) => (
            <div key={index} className={style.gridItem}>
              {buttonPositions.includes(index + 1) ? (
                <button>
                  <Image
                    src={ImagenBocha}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="w-[25px] sm:w-[25px] md:w-[30px]"
                  />
                </button>
              ) : (
                index + 1
              )}
            </div>
          ))}
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-evenly items-center z-10 pointer-events-none">
            <h1 className="text-2xl font-bold text-white bg-green-600 p-2 rounded-xl pointer-events-auto">
              Cuarto n°: 1
            </h1>
            <button className="bg-blue-600 text-white text-2xl font-bold rounded-md p-2 pointer-events-auto">
              Guardar
            </button>
          </div>
          s
        </div>
      )}
    </div>
  );
};
