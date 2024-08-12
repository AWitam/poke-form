import { z } from "zod";

const TIME_API_URL = "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Warsaw";

const timeSchema = z.object({
  year: z.number(),
  month: z.number(),
  day: z.number(),
  dayOfWeek: z.string(),
});

export const getDate = async () => {
  const res = await fetch(TIME_API_URL, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    return { error: res.statusText };
  }

  const timeData = await res.json();
  const { data, error } = timeSchema.safeParse(timeData);

  if (error) {
    return { error: "Invalid data" };
  }

  return data;
};
