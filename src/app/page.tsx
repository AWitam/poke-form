import { TrainerRegistrationForm } from "@/features/trainer-form/TrainerRegistrationForm";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <main>
      <Container sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TrainerRegistrationForm />
      </Container>
    </main>
  );
}
