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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { users } from "../../backend/db/users";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import Snackbar from "@mui/material/Snackbar";

const defaultTheme = createTheme();

export default function Login() {
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
        navigate("/");
        window.location.reload();
      }, [1500]);
    } else {
      setStat("error");
      handleClick();
    }
  };
  let refer = useRef();

  useEffect(() => {
    refer.current.focus();
  }, []);

  return (
    !loading && (
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
                ref={refer}
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
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          anchorPosition={{ left: 10, top: 300 }}
          open={open}
          autoHideDuration={3000}
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
      </ThemeProvider>
    )
  );
}
