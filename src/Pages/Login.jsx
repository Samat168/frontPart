import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuth();

  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Заполните поля!");
      return;
    }
    const formData = {
      email,
      password,
    };

    handleLogin(formData, email);
  };

  return (
    <div style={{}}>
      <Box
        sx={{
          width: "100%",
          height: "800px",
          paddingTop: "140px",
          backgroundColor: "#3e523063",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            width: "350px",
            margin: "auto",
            padding: "20px",
            boxShadow: "10px 10px 35px #434040",
            borderRadius: "10px",
            backgroundColor: "white",
            marginBottom: "20px",
          }}
        >
          {error && (
            <Typography color="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Typography>
          )}

          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Войти
          </Typography>

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "15px", width: "100%" }}
          />

          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px", width: "100%" }}
          />

          {loading ? (
            <CircularProgress sx={{ marginBottom: "20px" }} />
          ) : (
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              sx={{ marginBottom: "15px", width: "100%" }}
            >
              Войти
            </Button>
          )}

          <Button
            onClick={() => navigate("/forgot_password")}
            variant="text"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            Забыл пароль?
          </Button>
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default Login;
