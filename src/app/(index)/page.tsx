import { TrainerRegistrationForm } from "@/features/trainer-form/TrainerRegistrationForm";
import { getDate } from "@/lib/getDate";
import { formatDate } from "@/lib/utils";
import { Box, Typography } from "@mui/material";

export default async function Index() {
  const date = await getDate();
  const isDateError = "error" in date;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.400",
        borderRadius: 1,
        maxWidth: 544,
      }}
      p={{ xs: 2, sm: 4 }}
    >
      <Box display={"flex"} justifyContent={"flex-end"} pb={3}>
        <Typography variant="body2" color={isDateError ? "error.main" : ""}>
          {isDateError ? date.error : formatDate(date)}
        </Typography>
      </Box>
      <TrainerRegistrationForm />
    </Box>
  );
}
