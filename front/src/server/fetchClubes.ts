import { API } from "@/helper/helper";

export const getAllClubes = async () => {
  const response = await fetch(`${API}/api/clubes`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los clubes");
  }

  const data = await response.json();
  return data;
};
