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

  const login = async (credentials: ILogin) => {
    try {
      const data = await postSignin(credentials);
      setUser(data); // Establece el usuario recibido del backend
      setIsAuthenticated(true);
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
    router.push("/");
  };

  useEffect(() => {
    // Aquí puedes agregar lógica si deseas persistir la sesión de alguna manera
    setLoading(false);
  }, []);

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
