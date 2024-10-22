"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../app/public/svg/Logo.png";
import Image from "next/image";
import { UserContext } from "@/context/userContext";
import {
  getEstadisticaPartido,
  obtenerPartidosPorUsuario,
} from "@/server/fetchPartidos";
import Swal from "sweetalert2";
import { getAllClubes } from "@/server/fetchClubes";
import Link from "next/link";

interface Partido {
  id: number;
  fecha: Date;
  fechaTorneo: string;
  clubId: number;
  torneoId?: number;
  usuarioId?: number;
}

interface Club {
  id: number;
  nombre: string;
}

interface Estadistica {
  id: number;
  golA: number;
  golE: number;
  ccA: number;
  ccE: number;
  largoA: number;
  largoE: number;
  ingresoA: number;
  ingresoE: number;
  tirosA: number;
  tirosE: number;
  cuartoNumero: number;
}

export default function MisPartidosComponent() {
  const { user, loading } = useContext(UserContext);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);

  const usuarioId = user?.usuario?.id ?? null;
  console.log("afuera", usuarioId);

  useEffect(() => {
    const fetchData = async () => {
      if (usuarioId) {
        console.log(usuarioId);

        try {
          const [partidosData, clubesData] = await Promise.all([
            obtenerPartidosPorUsuario(usuarioId),
            getAllClubes(),
          ]);
          setPartidos(partidosData || []);
          setClubes(clubesData || []);
          console.log("partidos:", partidosData);
          console.log("clubes:", clubesData);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo obtener la información.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          console.error("Error al obtener datos:", error);
        }
      }
    };

    fetchData();
  }, [usuarioId]);

  const handleViewEstadisticas = async (partidoId: number) => {
    try {
      const stats = await getEstadisticaPartido(partidoId.toString());
      if (stats && stats.length > 0) {
        setEstadisticas(stats);
      } else {
        Swal.fire({
          title: "Sin Estadísticas",
          text: "No se encontraron estadísticas para este partido.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
        setEstadisticas([]);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener las estadísticas.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al obtener estadísticas:", error);
    }
  };

  const getClubName = (id: number) => {
    const club = clubes.find((club) => club.id === id);
    return club ? club.nombre : "Club no encontrado";
  };

  const calcularTotales = () => {
    return estadisticas.reduce(
      (totales, estadistica) => ({
        golA: totales.golA + estadistica.golA,
        golE: totales.golE + estadistica.golE,
        ccA: totales.ccA + estadistica.ccA,
        ccE: totales.ccE + estadistica.ccE,
        largoA: totales.largoA + estadistica.largoA,
        largoE: totales.largoE + estadistica.largoE,
        ingresoA: totales.ingresoA + estadistica.ingresoA,
        ingresoE: totales.ingresoE + estadistica.ingresoE,
        tirosA: totales.tirosA + estadistica.tirosA,
        tirosE: totales.tirosE + estadistica.tirosE,
      }),
      {
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
      }
    );
  };

  const totales = calcularTotales();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-5">
      <div>
        <Image src={Logo} alt="Logo" width={300} height={300} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">
          Bienvenido <span className="text-3xl">{user?.usuario?.nombre}</span>
        </h1>
        <h2 className="text-lg font-semibold">
          Club:{" "}
          <span className="text-xl">{getClubName(user?.usuario?.clubId!)}</span>
        </h2>
      </div>
      <div className="mt-5">
        <Link
          href="/Match"
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Crear Partido
        </Link>
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Mis Partidos:</h2>
        <ul className="list-none mx-5">
          {partidos.length > 0 ? (
            partidos.map((partido) => (
              <li
                key={partido.id}
                className="flex justify-between items-center my-2 p-2 border rounded"
              >
                <span className="text-sm">
                  Partido Vs: {getClubName(partido.clubId)}
                </span>
                <span className="text-sm">
                  Fecha: {new Date(partido.fecha).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleViewEstadisticas(partido.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Ver Estadísticas
                </button>
              </li>
            ))
          ) : (
            <li className="text-sm">Aún no tienes partidos registrados.</li>
          )}
        </ul>
      </div>

      {estadisticas.length > 0 && (
        <div className="mt-5 overflow-x-auto w-full mb-10 mx-5">
          <h2 className="text-lg font-semibold">Estadísticas del Partido:</h2>
          <table className="min-w-full border-collapse border border-gray-200 my-2 mx-5">
            <thead>
              <tr>
                {[
                  "Cuarto",
                  "Goles a Favor",
                  "Goles En Contra",
                  "C.C. a Favor",
                  "C.C. En Contra",
                  "Largo a Favor",
                  "Largo En Contra",
                  "Ingreso a Favor",
                  "Ingreso En Contra",
                  "Tiros al Arco a Favor",
                  "Tiros al Arco En Contra",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 p-2 text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estadisticas
                .sort((a, b) => a.cuartoNumero - b.cuartoNumero)
                .map((estadistica) => (
                  <tr key={estadistica.id}>
                    {[
                      estadistica.cuartoNumero,
                      estadistica.golA,
                      estadistica.golE,
                      estadistica.ccA,
                      estadistica.ccE,
                      estadistica.largoA,
                      estadistica.largoE,
                      estadistica.ingresoA,
                      estadistica.ingresoE,
                      estadistica.tirosA,
                      estadistica.tirosE,
                    ].map((value, index) => (
                      <td
                        key={index}
                        className="border border-gray-300 p-2 text-center"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-bold">
                  Totales
                </td>
                {Object.values(totales).map((total, index) => (
                  <td
                    key={index}
                    className="border border-gray-300 p-2 text-center"
                  >
                    {total}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
