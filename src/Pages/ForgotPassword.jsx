import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Введите email!");
      return;
    }
    setLoading(true); // Начинаем загрузку

    try {
      // Отправляем POST-запрос с email в URL
      const response = await axios.post(
        `http://localhost:8080/users/forgot_password?email=${email}` // email передается как параметр в URL
      );
      setMessage("Ссылка для сброса пароля отправлена на вашу почту.");
    } catch (error) {
      console.error(error);
      setMessage("Ошибка при отправке ссылки. Попробуйте снова.");
    } finally {
      setLoading(false); // Завершаем загрузку
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
        Забыл пароль
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: "300px" }}
      />
      <Button
        variant="contained"
        onClick={handleForgotPassword}
        disabled={loading} // Делаем кнопку неактивной, пока идет запрос
      >
        {loading ? "Отправка..." : "Отправить ссылку"}
      </Button>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default ForgotPassword;
