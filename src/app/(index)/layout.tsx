import Container from "@mui/material/Container";
import type { ReactNode } from "react";

export default function IndexLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Container>
    </main>
  );
}
