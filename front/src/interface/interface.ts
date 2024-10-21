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
  id: string;
  nombre: string;
  club: string;
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
};
