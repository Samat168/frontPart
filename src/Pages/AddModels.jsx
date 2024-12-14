import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useProduct } from "../context/ProductContextProvider";
import HeroPages from "../components/HeroPages";
import "../styles/AdminStyles/AddModelsStyle.css";

const AddModels = ({ animat }) => {
  const { createProduct } = useProduct();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [tip, setTip] = useState("");
  const [year, setYear] = useState("");
  const [rule, setRule] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [carStatus, setCarStatus] = useState(""); // Изменено: carStatus с выбором
  const [volume, setVolume] = useState("");
  const [probeg, setProbeg] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Изменено: изображение будет файлом, а не строкой

  // Обработчик загрузки изображения
  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Сохраняем сам файл
  };

  const handleSave = async () => {
    const formData = new FormData();

    // Добавление текстовых полей в FormData
    formData.append("make", make);
    formData.append("model", model);
    formData.append("tip", tip);
    formData.append("year", year);
    formData.append("rule", rule);
    formData.append("licensePlate", licensePlate);
    formData.append("carStatus", carStatus);
    formData.append("volume", volume);
    formData.append("probeg", probeg);
    formData.append("color", color);
    formData.append("price", price);

    // Добавление файла
    if (image) {
      formData.append("image", image); // Это будет объект File, который выбран пользователем
    }

    try {
      const response = await fetch("http://localhost:8080/cars/add", {
        method: "POST",
        body: formData, // Передаем formData вместо JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка при создании продукта:", errorData);
        alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
      } else {
        console.log("Продукт успешно создан!");
        alert("Продукт успешно добавлен!");
      }
    } catch (error) {
      console.error("Ошибка при сохранении продукта:", error);
    }
  };

  return (
    <div>
      <HeroPages name="Админ панель" />
      <div className="add_product" id={animat ? "product" : "p"}>
        <h2>Создать продукт</h2>
        <TextField
          onChange={(e) => setMake(e.target.value)}
          placeholder="Make"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setTip(e.target.value)}
          placeholder="Tip"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setRule(e.target.value)}
          placeholder="Rule"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="License Plate"
          type="text"
          className="add_product_input"
        />
        <select
          value={carStatus}
          onChange={(e) => setCarStatus(e.target.value)}
          className="add_product_input"
        >
          <option value="" disabled>
            Выберите статус
          </option>
          <option value="RESERVED">RESERVED</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="RENTED">RENTED</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </select>
        <TextField
          onChange={(e) => setVolume(e.target.value)}
          placeholder="Volume"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setProbeg(e.target.value)}
          placeholder="Probeg"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          type="text"
          className="add_product_input"
        />
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="text"
          className="add_product_input"
        />
        <input
          type="file"
          onChange={handleImageChange}
          style={{ backgroundColor: "white" }}
          className="add_product_input"
        />
        <button onClick={handleSave} className="add_product_button">
          Create Product
        </button>
      </div>
      <div className="book-banner">
        <div className="book-banner__overlay"></div>
        <div className="container">
          <div className="text-content">
            <h2>Забронируйте автомобиль, связавшись с нами</h2>
            <span>
              <i className="fa-solid fa-phone"></i>
              <h3>(996)776-65-03-84</h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModels;
