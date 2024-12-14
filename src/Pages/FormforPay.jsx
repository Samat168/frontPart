import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import "./FormForPay.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContextProvider";
import { calcTotalPrice } from "../../helpers/functions";

const FormforPay = () => {
  const [item, setItem] = useState("");
  const [numCard, setNumCard] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [index, setIndex] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { cart, getCart, handleSubmit } = useCart();
  console.log(cart.products.map((product) => console.log(product)));
  // const handleSave = () => {

  //   const order = {
  //     products :[{
  //       product : cart.products.map((product) => product.id && product.title)
  //     }],
  //     address: city,
  //     number : phone,

  //   };
  //   handleSubmit(order);
  // };

  const cartCleaner = () => {
    if (
      !item.trim() ||
      !numCard.trim() ||
      !date.trim() ||
      !year.trim() ||
      !cvv.trim() ||
      !name.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !country.trim() ||
      !city.trim() ||
      !index.trim() ||
      !phone.trim()
    ) {
      alert("Заполните все поля!!");

      return;
    }

    localStorage.removeItem("cart");
    getCart();
    navigate("/");
  };

  return (
    <div>
      <div className="block">
        <h2 style={{ color: "black", marginBottom: "20px" }}>
          {" "}
          Способ Оплаты{" "}
        </h2>
        <Box sx={{ Width: "30%" }}>
          <FormControl
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              width: "250px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Способ Оплаты</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Category"
              value={MenuItem.value}
              onChange={(event) => setItem(event.target.value)}
            >
              <MenuItem value="visa">visa</MenuItem>
              <MenuItem value="Paypal">Paypal</MenuItem>
              <MenuItem value="WebMoney">WebMoney</MenuItem>
              <MenuItem value="MasterCard">MasterCard</MenuItem>
              <MenuItem value="American Express">American Express</MenuItem>
              <MenuItem value="MBANK">MBANK</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            Width: "30%",
            marginTop: "5%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <h4 style={{ color: "black" }}>Номер карты</h4>
            <FormControl
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop: "3%",
                width: "250px",
                border: "none",
                border: "1px solid black",
              }}
            >
              <Input
                className="Card"
                type="number"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  height: "50px",
                  padding: "10px",
                  borderBottom: "none",
                  border: "0.5px solid grey",
                }}
                onChange={(event) => setNumCard(event.target.value)}
              />
            </FormControl>
          </Box>
          <Box sx={{ marginLeft: "5%" }}>
            <h4 style={{ color: "black", marginBottom: "3%" }}>
              Срок действия карты
            </h4>
            <FormControl
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <InputLabel id="demo-simple-select-label">-- </InputLabel>
              <Select
                sx={{ height: "50px", width: "60px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue=""
                label="Category"
                value={MenuItem.value}
                onChange={(event) => setDate(event.target.value)}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginLeft: "15px",
              }}
            >
              <InputLabel id="demo-simple-select-label">-- </InputLabel>
              <Select
                sx={{ height: "50px", width: "100px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue=""
                label="Category"
                value={MenuItem.value}
                onChange={(event) => setYear(event.target.value)}
              >
                <MenuItem value="1">2023</MenuItem>
                <MenuItem value="2">2024</MenuItem>
                <MenuItem value="3">2025</MenuItem>
                <MenuItem value="4">2026</MenuItem>
                <MenuItem value="5">2027</MenuItem>
                <MenuItem value="6">2028</MenuItem>
                <MenuItem value="7">2029</MenuItem>
                <MenuItem value="8">2030</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ marginLeft: "20px" }}>
            <h3 style={{ color: "black" }}>Зашитный код CVV</h3>
            <FormControl
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                marginTop: "3%",
                width: "50px",
                border: "1px solid grey",
                marginLeft: "10px",
              }}
            >
              <Input
                type="text"
                name="salo"
                maxLength={3}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  height: "45px",
                  borderBottom: "none",
                }}
                onChange={(event) => setCvv(event.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          className="salam"
        >
          <Box sx={{ width: "50%" }}>
            <h2 style={{ color: "black", marginTop: "50px" }}>
              {" "}
              Информация о счете
            </h2>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                width: "310px",
                marginBottom: "3%",
              }}
              className="inp_name"
            >
              <Input
                placeholder="Имя"
                type="text"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "45px",
                  borderBottom: "none",
                  paddingLeft: "15px",
                  width: "155px",
                  border: "0.5px solid grey",
                }}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="text"
                placeholder="Фамилия"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "45px",
                  borderBottom: "none",
                  paddingLeft: "15px",
                  marginLeft: "15px",
                  width: "155px",
                  border: "0.5px solid grey",
                }}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="email"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "45px",
                borderBottom: "none",
                paddingLeft: "15px",
                width: "310px",
                marginBottom: "3%",
                marginTop: "2%",
                border: "0.5px solid grey",
              }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Страна"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "45px",
                borderBottom: "none",
                paddingLeft: "15px",
                width: "310px",
                marginTop: "2%",
                marginBottom: "3%",
                display: "block",
                paddingTop: "7px",
                border: "0.5px solid grey",
              }}
              onChange={(event) => setCountry(event.target.value)}
            />
          </Box>
          <Box>
            <Input
              className="block-2"
              type="text"
              placeholder="Город"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "45px",
                borderBottom: "none",
                paddingLeft: "15px",
                width: "310px",
                marginBottom: "6%",
                marginTop: "90px",
                paddingTop: "7px",
                display: "block",
                border: "0.5px solid grey",
              }}
              onChange={(event) => setCity(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Почтовый индекс"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "45px",
                borderBottom: "none",
                paddingLeft: "15px",
                width: "310px",
                marginBottom: "6%",
                marginTop: "2%",
                display: "block",
                paddingTop: "7px",
                border: "0.5px solid grey",
              }}
              onChange={(event) => setIndex(event.target.value)}
            />
            <Input
              type="text"
              placeholder="Номер"
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "45px",
                borderBottom: "none",
                paddingLeft: "15px",
                width: "310px",
                marginBottom: "3%",
                marginTop: "2%",
                display: "block",
                paddingTop: "7px",
                border: "0.5px solid grey",
              }}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Box>
        </Box>

        <Button onClick={cartCleaner}>Оплатить</Button>
      </div>
    </div>
  );
};

export default FormforPay;
