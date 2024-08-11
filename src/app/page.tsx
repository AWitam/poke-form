import { Autocomplete } from "@/components/Autocomplete";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

const options = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
  { label: "The Dark Knight", id: 3 },
  { label: "Forrest Gump", id: 4 },
];

export default function Home() {
  return (
    <main>
      <Container>
        <Stack direction="row" spacing={2} my={2}>
          <Box height={40} width={40} bgcolor="primary.main" />
          <Box height={40} width={40} bgcolor="primary.dark" />
          <Box height={40} width={40} bgcolor="primary.light" />
          <Box height={40} width={40} bgcolor="grey.100" />
          <Box height={40} width={40} bgcolor="grey.200" />
          <Box height={40} width={40} bgcolor="grey.300" />
          <Box height={40} width={40} bgcolor="grey.400" />
          <Box height={40} width={40} bgcolor="error.main" />
          <Box height={40} width={40} bgcolor="action.disabled" />
        </Stack>

        <Stack spacing={2} direction="row" my={2}>
          <Button variant="contained">Inactive</Button>
          <Button variant="soft">Inactive</Button>
        </Stack>

        <Stack spacing={2} direction="row" my={2}>
          <Stack width={300}>
            <Label htmlFor="movie">Movie</Label>
            <Autocomplete options={options} inputProps={{ id: "movie", helperText: "test", placeholder: "movies" }} />
          </Stack>
          <Stack>
            <Label htmlFor="movie">Movie</Label>
            <Input helperText="test" placeholder="test" />
          </Stack>
        </Stack>
        <Stack spacing={2} direction="row" my={2}>
          <Chip label="The Godfather" variant="filled" />
        </Stack>
      </Container>
    </main>
  );
}
