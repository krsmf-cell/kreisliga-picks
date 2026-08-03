import { api } from "../../api/api";

export async function importSchedule(
  url: string,
) {

  const { data } = await api.post(
    "/imports/schedule",
    {
      url,
    },
  );

  return data;

}