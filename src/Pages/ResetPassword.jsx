import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      alert("Введите новый пароль!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:8080/users/reset_password?token=${token}&newPassword=${newPassword}`
      );
      setMessage("Пароль успешно изменен.");
      setTimeout(() => {
        // Перенаправление на страницу входа после 2 секунд
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage("Ошибка при изменении пароля. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginTop: "90px",
        }}
      >
        Новый пароль
      </Typography>
      <TextField
        label="Новый пароль"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ width: "300px" }}
      />
      <Button
        variant="contained"
        onClick={handleResetPassword}
        disabled={loading}
      >
        {loading ? "Обработка..." : "Подтвердить"}
      </Button>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default ResetPassword;
