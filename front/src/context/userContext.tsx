"use client";
import { createContext, useState, useEffect } from "react";
import {
  IUserProfile,
  IUserContext,
  ILogin,
  IRegister,
} from "@/interface/interface";
import { useRouter } from "next/navigation";
import { postSignin, postSignup } from "../server/fetchUser";

export const UserContext = createContext<IUserContext>({
  user: {} as IUserProfile,
  setUser: () => {},
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Cargar datos de localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Establecer estado de autenticación basado en localStorage
    setIsAuthenticated(storedAuth === "true");
    setLoading(false); // Establecer loading en false al final
  }, []);

  const login = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(data.usuario)); // Guardar usuario en localStorage
      localStorage.setItem("isAuthenticated", "true"); // Guardar estado de autenticación
      console.log("datos del usuario desde el back", data);
      return true;
    } catch (error) {
      console.error("Error en el login:", error);
      return false;
    }
  };

  const register = async (user: IRegister) => {
    try {
      const data = await postSignup(user);
      return data;
    } catch (error) {
      console.error("Error en el registro:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        isAuthenticated,
        setIsAuthenticated,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
