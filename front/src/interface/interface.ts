interface ILogin {
  email: string;
  password: string;
}

interface IErrorsLogin {
  email?: string;
  password?: string;
}

interface IErrorsRegister {
  nombre?: string;
  club?: string;
  category?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface IUserProfile {
  usuario: IUsuario;
}

interface IUsuario {
  id: string;
  nombre: string;
  clubId: number;
  category: string;
  email: string;
}

interface IRegister {
  nombre: string;
  club: string;
  category: string;
  email: string;
  password: string;
}

interface IEstadistica {
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

interface IUserContext {
  user: IUserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<IUserProfile | null>>;
  login: (credentials: ILogin) => Promise<boolean>;
  register: (credentials: IRegister) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export type {
  ILogin,
  IErrorsLogin,
  IErrorsRegister,
  IUserProfile,
  IRegister,
  IUserContext,
  IEstadistica,
};
