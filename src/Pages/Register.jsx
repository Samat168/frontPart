import React, { useState } from "react";
// import Logo from "../images/logo/logo.png";
// import back from "../images/logo/reg.png";

// import { useNavigate, useNavigation } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContextProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driverLicense, setdriverLicense] = useState("");

  // const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuth();

  function handleSave() {
    if (
      !email.trim() ||
      !password.trim() ||
      !driverLicense.trim() ||
      !name.trim() ||
      !phone.trim()
    ) {
      alert("Заполните поля!");
      return;
    }

    const formData = new FormData();

    formData.append("email", email);
    formData.append("username", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("driverLicense", driverLicense);
    handleRegister(formData);
  }

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
          padding: "auto",
          margin: "auto",
          boxShadow: "10px 10px 35px  #434040",
          paddingTop: "40px",
          borderRadius: "10px",
          backgroundColor: "white",
          marginBottom: "20px",
        }}
      >
        {error ? <h2>{error}</h2> : null}
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          Регистрация
        </h2>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "white",
            marginLeft: "15px",
            marginBottom: "15px",
            fontSize: "40px",
          }}
        >
          registration
        </Typography>
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
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            sx={{
              marginTop: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "47%",

              marginInline: "auto",
            }}
          />
          <TextField
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone"
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
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
          onChange={(e) => setdriverLicense(e.target.value)}
          placeholder="driverLicense"
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
              // backgroundColor: "white",
              width: "110px",
              margin: "auto",
              marginTop: "10px",
              color: "blue",
              border: "1px solid white",
              backgroundColor: "grey",
            }}
          >
            <a style={{ color: "white" }} href="https://mail.google.com/">
              REGISTER
            </a>
          </Button>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default Register;
