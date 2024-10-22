import { API } from "@/helper/helper";
import { IEstadistica } from "@/interface/interface";

export const createEstadisticas = async (data: IEstadistica) => {
  console.log("estadisticas enviadas al back", data);

  const response = await fetch(`${API}/api/estadisticas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear las estadisticas");
  }

  const responseData = await response.json();
  console.log("respuesta del back", responseData);

  return responseData;
};
