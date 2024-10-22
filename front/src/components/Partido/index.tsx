"use client";
import React, { useState, useEffect, useContext } from "react";
import style from "./partido.module.css";
import Image from "next/image";
import ImagenBocha from "../../app/public/svg/ball.png";
import Swal from "sweetalert2"; // Importar SweetAlert2
import { getAllClubes } from "@/server/fetchClubes";
import { getAllTorneos } from "@/server/fetchTorneo";
import { createPartido } from "@/server/fetchPartidos";
import { createEstadisticas } from "@/server/fetchEstadisticas"; // Importar función para crear estadísticas
import { UserContext } from "@/context/userContext";

export const PartidoComponent = () => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(true);
  const [clubes, setClubes] = useState<any[]>([]);
  const [torneos, setTorneos] = useState<any[]>([]);
  const [partidoId, setPartidoId] = useState<string | null>(null);
  const [estadisticas, setEstadisticas] = useState({
    golA: 0,
    golE: 0,
    ccA: 0,
    ccE: 0,
    largoA: 0,
    largoE: 0,
    ingresoA: 0,
    ingresoE: 0,
    tirosA: 0,
    tirosE: 0,
    cuartoNumero: 1, // Iniciar cuartoNumero en 1
  });
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split("T")[0],
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const partidoCreado = await createPartido(formData); // Suponiendo que esto devuelve el partido creado
      setPartidoId(partidoCreado.id); // Guarda el ID del partido
      setShowModal(false);
    } catch (error) {
      console.error("Error creando partido:", error);
    }
  };

  type EstadisticasKeys = keyof typeof estadisticas;

  // Función para incrementar o decrementar el cuarto
  const handleCuartoChange = (delta: number) => {
    setEstadisticas((prevStats) => ({
      ...prevStats,
      cuartoNumero: Math.max(1, Math.min(4, prevStats.cuartoNumero + delta)),
    }));
  };

  // Función para cambiar las estadísticas
  const handleEstadisticaChange = (key: EstadisticasKeys, delta: number) => {
    setEstadisticas((prevStats) => ({
      ...prevStats,
      [key]: Math.max(0, prevStats[key] + delta), // Evitar valores negativos
    }));
  };

  // Función para guardar las estadísticas
  const handleGuardar = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres guardar las estadísticas?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        if (!partidoId) {
          Swal.fire("Error", "No se ha encontrado el ID del partido", "error");
          return;
        }

        const data = { ...estadisticas, partidoId }; // Incluye el partidoId en los datos
        console.log("datos al back desde el componente", data);

        await createEstadisticas(data); // Enviar las estadísticas al backend
        Swal.fire("¡Guardado!", "Las estadísticas se han guardado.", "success");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al guardar las estadísticas",
        "error"
      );
    }
  };

  // Números donde se quieren agregar botones
  const buttonPositions: { pos: number; key: keyof typeof estadisticas }[] = [
    { pos: 7, key: "golA" },
    { pos: 345, key: "golE" },
    { pos: 3, key: "ccA" },
    { pos: 349, key: "ccE" },
    { pos: 98, key: "largoA" },
    { pos: 241, key: "largoE" },
    { pos: 72, key: "ingresoA" },
    { pos: 267, key: "ingresoE" },
    { pos: 46, key: "tirosA" },
    { pos: 293, key: "tirosE" },
  ];

  return (
    <div className={style.conteiner}>
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

      {!showModal && (
        <div className={style.gridContainer}>
          {Array.from({ length: 351 }).map((_, index) => {
            const buttonData = buttonPositions.find((b) => b.pos === index + 1);
            return (
              <div key={index} className={style.gridItem}>
                {buttonData ? (
                  <>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          handleEstadisticaChange(buttonData.key, 1)
                        }
                        className="relative flex items-center justify-center"
                      >
                        <Image
                          src={ImagenBocha}
                          alt="Imagen de la pelota"
                          width={70}
                          height={70}
                        />
                        <span className="absolute inset-0 flex items-center text-sm text-black justify-center font-bold">
                          {estadisticas[buttonData.key]}
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          handleEstadisticaChange(buttonData.key, -1)
                        }
                      >
                        -
                      </button>
                    </div>
                  </>
                ) : index + 1 === 6 ? (
                  <span className="font-bold text-sm text-black">GolA</span>
                ) : index + 1 === 2 ? (
                  <span className="font-bold text-sm text-black">CCA</span>
                ) : index + 1 === 45 ? (
                  <span className="font-bold text-sm text-black">TiroA</span>
                ) : index + 1 === 71 ? (
                  <span className="font-bold text-sm text-black">IngA</span>
                ) : index + 1 === 97 ? (
                  <span className="font-bold text-sm text-black">LarA</span>
                ) : index + 1 === 240 ? (
                  <span className="font-bold text-sm text-black">LarE</span>
                ) : index + 1 === 266 ? (
                  <span className="font-bold text-sm text-black">IngE</span>
                ) : index + 1 === 292 ? (
                  <span className="font-bold text-sm text-black">TiroE</span>
                ) : index + 1 === 344 ? (
                  <span className="font-bold text-sm text-black">GolE</span>
                ) : index + 1 === 348 ? (
                  <span className="font-bold text-sm text-black">CCE</span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {/* Controles de Cuarto */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="flex flex-col items-center  pointer-events-auto">
          <button
            onClick={() => handleCuartoChange(1)}
            disabled={estadisticas.cuartoNumero === 4}
            className="bg-gray-200 text-black rounded-full font-bold px-2"
          >
            +
          </button>
          <span className="bg-red-600 text-white font-bold rounded-md p-2 my-1">
            Cuarto: {estadisticas.cuartoNumero}
          </span>

          <button
            onClick={() => handleCuartoChange(-1)}
            disabled={estadisticas.cuartoNumero === 1}
            className="bg-gray-200 text-black rounded-full text-xl font-bold px-2"
          >
            -
          </button>
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white font-bold rounded-md p-2 mt-5"
          >
            Guardar Estadística
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartidoComponent;
