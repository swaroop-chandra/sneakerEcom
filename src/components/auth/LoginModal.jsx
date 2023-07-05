import React, { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Alert,
  Modal,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { users } from "../../backend/db/users";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import Snackbar from "@mui/material/Snackbar";

const defaultTheme = createTheme();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ openMOdal, setOpenModal, seloggedFlag }) {
  const handleCloseModal = () => setOpenModal(false);

  const { loading } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [stat, setStat] = React.useState("success");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let details = users.filter(
      (res) =>
        res.email == data.get("email") && res.password == data.get("password")
    );
    if (details.length > 0) {
      localStorage.setItem("user_email", details[0].email);
      localStorage.setItem("user_id", details[0]._id);
      localStorage.setItem("user_name", details[0].firstName);
      setStat("success");
      handleClick();
      setTimeout(() => {
        seloggedFlag(true);
        handleCloseModal();
      }, [2000]);
    } else {
      setStat("error");
      handleClick();
    }
  };

  return (
    !loading && (
      <div>
        <Modal
          open={openMOdal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="/forgot" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          Don't have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Container>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorPosition={{ left: 10, top: 300 }}
                  open={open}
                  autoHideDuration={1500}
                  onClose={handleClose}
                >
                  {stat == "success" ? (
                    <Alert
                      onClose={handleClose}
                      severity={"success"}
                      sx={{ width: "100%" }}
                    >
                      Logged In successfully 😊
                    </Alert>
                  ) : (
                    <Alert
                      onClose={handleClose}
                      severity={"error"}
                      sx={{ width: "100%" }}
                    >
                      Wrong password or username 😔
                    </Alert>
                  )}
                </Snackbar>
              </Stack>
            </ThemeProvider>
          </Box>
        </Modal>
      </div>
    )
  );
}
