"use client";
import React, { useContext, useEffect } from "react";
import Logo from "../../app/public/svg/Logo.png";
import Image from "next/image";
import { UserContext } from "@/context/userContext";
import { getAllPartidos, getEstadisticaPartido } from "@/server/fetchPartidos";
import Swal from "sweetalert2";
import { getAllClubes } from "@/server/fetchClubes";

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
  cuartoId: number;
}

export default function MisPartidosComponet() {
  const { user, isAuthenticated } = useContext(UserContext);
  const [partidos, setPartidos] = React.useState<Partido[]>([]);
  const [estadisticas, setEstadisticas] = React.useState<Estadistica[] | null>(
    null
  );
  const [clubes, setClubes] = React.useState<Club[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "No estás autenticado",
        text: "Serás redirigido a la página de inicio de sesión.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      const fetchPartidos = async () => {
        try {
          const data = await getAllPartidos();
          setPartidos(data);
        } catch (error) {
          console.error("Error al obtener los partidos:", error);
        }
      };
      const fetchClubes = async () => {
        try {
          const data = await getAllClubes();
          setClubes(data);
        } catch (error) {
          console.error("Error al obtener los clubes:", error);
        }
      };

      fetchPartidos();
      fetchClubes();
    }
  }, [isAuthenticated]);

  const { nombre } = user?.usuario || {};

  const handleViewEstadisticas = async (partidoId: number) => {
    try {
      const stats = await getEstadisticaPartido(partidoId.toString());
      const allEstadisticas = stats.flatMap((stat: any) => stat.estadisticas);
      setEstadisticas(allEstadisticas);
      console.log("Estadísticas del partido:", allEstadisticas);
    } catch (error) {
      console.error("Error al obtener las estadísticas:", error);
    }
  };

  const getClubName = (id: number) => {
    const club = clubes.find((club) => club.id === id);
    return club ? club.nombre : "Club no encontrado";
  };

  const calcularTotales = () => {
    if (!estadisticas) {
      return {
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
      };
    }
    return estadisticas.reduce(
      (totales, estadistica) => {
        return {
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
        };
      },
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <Image src={Logo} alt="Logo" width={300} height={300} />
      </div>

      <div>
        <h1 className="text-xl font-bold">
          Bienvenido <span className="text-2xl">{nombre}</span>
        </h1>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-semibold">Mis Partidos:</h2>
        <ul className="list-none">
          {partidos.map((partido) => (
            <li
              key={partido.id}
              className="flex justify-between items-center my-2 p-2 border rounded"
            >
              <span>Partido Vs: {getClubName(partido.clubId)} </span>
              <span>Fecha: {new Date(partido.fecha).toLocaleDateString()}</span>
              <button
                onClick={() => handleViewEstadisticas(partido.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Ver Estadísticas
              </button>
            </li>
          ))}
        </ul>
      </div>

      {estadisticas && (
        <div className="mt-5 overflow-x-auto w-full mb-10">
          <h2 className="text-lg font-semibold">Estadísticas del Partido:</h2>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Cuarto</th>
                <th className="border border-gray-300 p-2 text-sm">
                  Goles a Favor
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Goles En Contra
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  C.C. a Favor
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  C.C. En Contra
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Largo a Favor
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Largo En Contra
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Ingreso a Favor
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Ingreso En Contra
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Tiros al Arco a Favor
                </th>
                <th className="border border-gray-300 p-2 text-sm">
                  Tiros al Arco En Contra
                </th>
              </tr>
            </thead>
            <tbody>
              {estadisticas
                .sort((a, b) => a.cuartoId - b.cuartoId)
                .map((estadistica) => (
                  <tr key={estadistica.id}>
                    <td className="border border-gray-300 p-2 text-center font-bold">
                      {estadistica.cuartoId}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.golA}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.golE}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.ccA}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.ccE}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.largoA}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.largoE}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.ingresoA}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.ingresoE}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.tirosA}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {estadistica.tirosE}
                    </td>
                  </tr>
                ))}
              <tr className="font-bold">
                <td className="border border-gray-300 p-2 text-center">
                  Totales
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.golA}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.golE}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.ccA}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.ccE}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.largoA}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.largoE}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.ingresoA}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.ingresoE}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.tirosA}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {totales.tirosE}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
