import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driverLicense, setdriverLicense] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    // Проверка имени
    if (!name.trim()) {
      newErrors.name = "Введите имя.";
    }

    // Проверка номера телефона
    if (!phone.trim() || !/^\+996\d{9}$/.test(phone)) {
      newErrors.phone =
        "Номер телефона должен начинаться с +996 и содержать 12 цифр.";
    }

    // Проверка email
    if (!email.trim() || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      newErrors.email = "Введите корректный Gmail-адрес.";
    }

    // Проверка пароля
    if (!password.trim() || password.length <= 4) {
      newErrors.password = "Пароль должен содержать более 5 символов.";
    }

    // Проверка водительского удостоверения
    if (!driverLicense.trim()) {
      newErrors.driverLicense = "Введите данные водительского удостоверения.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Если ошибок нет, возвращаем true
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("driverLicense", driverLicense);
    handleRegister(formData);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        paddingTop: "140px",
        backgroundColor: "#3e523063",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "470px",
          width: "320px",
          margin: "auto",
          boxShadow: "10px 10px 35px  #434040",
          paddingTop: "40px",
          borderRadius: "10px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        {error ? <h2>{error}</h2> : null}
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Регистрация
        </h2>
        <div
          style={{
            display: "flex",
            width: "300px",
            marginInline: "auto",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            sx={{
              marginTop: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "47%",
              marginInline: "auto",
            }}
          />
          <TextField
            error={!!errors.phone}
            helperText={errors.phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Телефон"
            sx={{
              marginTop: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "47%",
              marginInline: "auto",
            }}
          />
        </div>
        <TextField
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Gmail"
          sx={{
            marginTop: "5px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "300px",
            marginInline: "auto",
            marginBottom: "10px",
          }}
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          type="password"
          sx={{
            marginTop: "5px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "300px",
            marginInline: "auto",
            marginBottom: "10px",
          }}
        />
        <TextField
          error={!!errors.driverLicense}
          helperText={errors.driverLicense}
          onChange={(e) => setdriverLicense(e.target.value)}
          placeholder="Водительское удостоверение"
          sx={{
            marginTop: "5px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "300px",
            marginInline: "auto",
            marginBottom: "10px",
          }}
        />
        {loading ? (
          <Box sx={{ display: "flex", marginInline: "auto" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            onClick={handleSave}
            variant="outlined"
            sx={{
              width: "110px",
              margin: "auto",
              marginTop: "10px",
              color: "blue",
              border: "1px solid white",
              backgroundColor: "grey",
            }}
          >
            <a style={{ color: "white" }}>REGISTER</a>
          </Button>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Register;
