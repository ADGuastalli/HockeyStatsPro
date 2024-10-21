import { API } from "@/helper/helper";

export const getAllTorneos = async () => {
  const response = await fetch(`${API}/api/torneos`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los torneos");
  }

  const data = await response.json();

  return data;
};
