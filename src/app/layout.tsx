import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/lib/theme";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "Pokémon Trainer Registration ",
  description: "Register a new Pokémon Trainer, including name, age, and first Pokémon choice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
