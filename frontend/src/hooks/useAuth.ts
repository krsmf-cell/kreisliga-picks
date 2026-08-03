import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  exp: number;
}

export function useAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}