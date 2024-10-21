import { IErrorsLogin, IErrorsRegister } from "../interface/interface";

const validateLogin = (
  values: IErrorsLogin,
  fieldsToValidate: string[]
): IErrorsLogin => {
  const errors: IErrorsLogin = {};

  if (fieldsToValidate.includes("email") && !values.email) {
    errors.email = "*";
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    }
  }

  return errors;
};

const validateRegister = (
  values: IErrorsRegister,
  fieldsToValidate: string[]
): IErrorsRegister => {
  const errors: IErrorsRegister = {};

  if (fieldsToValidate.includes("nombre") && !values.nombre) {
    errors.nombre = "*";
  } else if (values.nombre) {
    if (values.nombre.length < 3 || values.nombre.length > 80) {
      errors.nombre = "El nombre debe tener entre 3 y 80 caracteres.";
    }
  }

  if (fieldsToValidate.includes("club") && !values.club) {
    errors.club = "*";
  }

  if (fieldsToValidate.includes("category") && !values.category) {
    errors.category = "*";
  }

  if (fieldsToValidate.includes("email") && !values.email) {
    errors.email = "*";
  } else if (values.email) {
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email es incorrecto. Ejemplo: example@example.com";
    }
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    }
  }

  if (fieldsToValidate.includes("confirmPassword")) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "*";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  }

  return errors;
};

export { validateLogin, validateRegister };
