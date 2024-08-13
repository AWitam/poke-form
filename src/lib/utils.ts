interface FormatDateParams {
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
}

export const formatDate = ({
  day,
  dayOfWeek,
  month,
  year,
}: FormatDateParams) => {
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");
  return `${dayOfWeek}, ${formattedDay}.${formattedMonth}.${year}`;
};
