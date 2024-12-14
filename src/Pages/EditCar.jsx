import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import HeroPages from "../components/HeroPages";
import "../styles/AdminStyles/AddModelsStyle.css";

const EditCar = () => {
  const { id } = useParams(); // Получение ID машины из URL
  const navigate = useNavigate();

  const [car, setCar] = useState({
    make: "",
    model: "",
    tip: "",
    year: "",
    rule: "",
    licensePlate: "",
    carStatus: "",
    volume: "",
    probeg: "",
    color: "",
    price: "",
    image: null,
  }); // Стейт для хранения данных автомобиля
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Получение данных автомобиля
  useEffect(() => {
    fetch(`http://localhost:8080/cars/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных автомобиля");
        }
        return response.json();
      })
      .then((data) => {
        setCar({
          ...data,
          image: null, // Изображение не загружается из API
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (field, value) => {
    setCar({ ...car, [field]: value });
  };

  const handleImageChange = (event) => {
    setCar({ ...car, image: event.target.files[0] }); // Обновление файла изображения
  };

  const handleSave = async () => {
    const formData = new FormData();

    // Добавление текстовых полей в FormData
    Object.keys(car).forEach((key) => {
      if (key !== "image" || car[key] !== null) {
        formData.append(key, car[key]);
      }
    });

    // Добавление изображения
    if (car.image) {
      formData.append("image", car.image);
    }

    try {
      const response = await fetch(`http://localhost:8080/cars/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка при обновлении данных автомобиля:", errorData);
        alert(`Ошибка: ${errorData.message || "Неизвестная ошибка"}`);
      } else {
        alert("Данные автомобиля успешно обновлены!");
        navigate("/models");
      }
    } catch (error) {
      console.error("Ошибка при сохранении данных автомобиля:", error);
      alert("Не удалось обновить данные автомобиля");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <HeroPages name="Редактирование автомобиля" />
      <div className="add_product">
        <h2>Редактировать автомобиль</h2>
        <TextField
          value={car.make}
          onChange={(e) => handleInputChange("make", e.target.value)}
          placeholder="Make"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.model}
          onChange={(e) => handleInputChange("model", e.target.value)}
          placeholder="Model"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.tip}
          onChange={(e) => handleInputChange("tip", e.target.value)}
          placeholder="Tip"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.year}
          onChange={(e) => handleInputChange("year", e.target.value)}
          placeholder="Year"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.rule}
          onChange={(e) => handleInputChange("rule", e.target.value)}
          placeholder="Rule"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.licensePlate}
          onChange={(e) => handleInputChange("licensePlate", e.target.value)}
          placeholder="License Plate"
          type="text"
          className="add_product_input"
        />
        <select
          value={car.carStatus}
          onChange={(e) => handleInputChange("carStatus", e.target.value)}
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
          value={car.volume}
          onChange={(e) => handleInputChange("volume", e.target.value)}
          placeholder="Volume"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.probeg}
          onChange={(e) => handleInputChange("probeg", e.target.value)}
          placeholder="Probeg"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.color}
          onChange={(e) => handleInputChange("color", e.target.value)}
          placeholder="Color"
          type="text"
          className="add_product_input"
        />
        <TextField
          value={car.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCar;
