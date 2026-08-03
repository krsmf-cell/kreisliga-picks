import { api } from "../../api/api";

export async function uploadLogo(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const res = await api.post(
    "/upload/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
}