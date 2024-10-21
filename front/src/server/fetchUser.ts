import { API } from "../helper/helper";
import { ILogin, IRegister } from "../interface/interface";

export const postSignin = async (credentials: ILogin) => {
  try {
    const response = await fetch(`${API}/api/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data; // Solo devuelve el usuario sin token
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postSignup = async (credentials: IRegister) => {
  const response = await fetch(`${API}/api/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error en el registro");
  }

  const data = await response.json();
  return data;
};

export const getUser_Id = async (id: string) => {
  const response = await fetch(`${API}/api/usuarios/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  const data = await response.json();
  const newData = {
    id: data.id,
    nombre: data.nombre,
    email: data.email,
    club: data.club,
    category: data.category,
  };
  return newData;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API}/api/usuarios`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  const data = await response.json();
  return data;
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API}/api/usuarios/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};
