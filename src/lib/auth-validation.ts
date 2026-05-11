export type LoginErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "El usuario/email es obligatorio";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return "El email no tiene un formato válido";

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password.trim()) return "La contraseña es obligatoria";

  if (password.length < 8) {
    return "La contraseña debe tener mínimo 8 caracteres";
  }

  if (!/[A-Z]/.test(password)) {
    return "Debe contener al menos una mayúscula";
  }

  if (!/[a-z]/.test(password)) {
    return "Debe contener al menos una minúscula";
  }

  if (!/[0-9]/.test(password)) {
    return "Debe contener al menos un número";
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(password)) {
    return "Debe contener al menos un carácter especial";
  }

  return undefined;
}

export function validateLoginForm(
  email: string,
  password: string,
): LoginErrors {
  const errors: LoginErrors = {};

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
}
