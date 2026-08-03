import { api } from "../../api/api";
import type { User } from "../types/user";

export async function getUsers() {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function updateUser(
  id: number,
  dto: Partial<User>,
) {
  const { data } = await api.patch(
    `/users/${id}/admin`,
    dto,
  );

  return data;
}