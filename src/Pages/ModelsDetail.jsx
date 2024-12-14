// src/components/CarDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import HeroPages from "../components/HeroPages";
import { Button, TextField, Typography } from "@mui/material";
import "../styles/ModelDetailsStyle/ModelDetails.css";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContextProvider";
import PaymentForm from "./PaymentForm";
function ModelsDetail() {
  const { carId } = useParams(); // Получаем id машины из URL
  const [car, setCar] = useState(null); // Состояние для хранения данных о машине
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { users, getUser } = useAuth();
  useEffect(() => {
    getUser(); // Загружаем данные пользователя один раз при монтировании
  }, []);

  // GET-запрос к серверу для получения данных о машине по id
  useEffect(() => {
    fetch(`http://localhost:8080/cars/${carId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [carId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const handleBooking = async () => {
    const bookingData = {
      carId: car.id,
      startDate: startDate,
      endDate: endDate,
      userId: users.id, // Подставьте ID текущего пользователя
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось забронировать автомобиль.");
      }

      alert("Автомобиль успешно забронирован!");
      setShowPaymentForm(true); // Показываем форму оплаты
    } catch (error) {
      console.error("Ошибка при бронировании:", error.message);
      alert("Произошла ошибка при бронировании.");
    }
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log("Оплата прошла успешно:", paymentData);
    alert("Оплата успешно завершена!");
    setShowPaymentForm(false); // Скрыть форму после успешной оплаты
  };

  return (
    <div>
      <div>
        <HeroPages name="Детальный обзор" />
        <div className="car-detail">
          <div className="car-detail__header">
            <h1>
              {car.make} {car.model}
            </h1>
            <img
              src={`http://localhost:8080/cars/${car.id}/photo`}
              alt={car.make}
            />
          </div>
          <div className="car-detail__info">
            <h3>Подробности:</h3>
            <p>Год: {car.year}</p>
            <p>Тип: {car.tip}</p>
            <p>Цена: {car.price} сом / день</p>
            <p>Пробег: {car.probeg} км</p>
            <p>Цвет: {car.color}</p>
            <p>Топливо: {car.tip}</p>
            <p>Номер машины: {car.licensePlate}</p>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                margin: "6px",
              }}
            >
              <TextField
                placeholder="Начало даты"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <TextField
                placeholder="Конец даты"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="car-detail__buttons">
            <Link to="/" className="back-button">
              Назад
            </Link>
            <Button
              to="#"
              className="book-button"
              onClick={handleBooking}
              disabled={showPaymentForm}
            >
              Забронировать поездку
            </Button>
          </div>
        </div>
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
      <Footer />
    </div>
  );
}

export default ModelsDetail;
