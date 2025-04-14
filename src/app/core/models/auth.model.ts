export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: unknown;
  created_at?: Date;
  updated_at?: Date;
}

export interface RegistrationData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  surname: string;
}
