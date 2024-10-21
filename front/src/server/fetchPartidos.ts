import { API } from "@/helper/helper";

export const getAllPartidos = async () => {
  const response = await fetch(`${API}/api/partidos`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los partidos");
  }

  const data = await response.json();

  return data;
};

export const getEstadisticaPartido = async (id: string) => {
  const response = await fetch(`${API}/api/estadisticas/cuartos/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener las estadisticas");
  }

  const data = await response.json();
  console.log("estadistica del partido", data);

  return data;
};

export const createPartido = async (data: any) => {
  const response = await fetch(`${API}/api/partidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear el partido");
  }

  const responseData = await response.json();

  return responseData;
};
