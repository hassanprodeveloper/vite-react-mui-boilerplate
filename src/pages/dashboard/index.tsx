import { Container, Typography } from "@mui/material";

const DashboardPage = () => {
  return (
    <Container maxWidth="xl">
      <Typography variant="h1">DashboardPage</Typography>
    </Container>
  );
};

export default DashboardPage;

DashboardPage.authGuard = true;
