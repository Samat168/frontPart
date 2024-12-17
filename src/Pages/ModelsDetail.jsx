import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import HeroPages from "../components/HeroPages";
import {
  Button,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import "../styles/ModelDetailsStyle/ModelDetails.css";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContextProvider";

function ModelsDetail() {
  const { carId } = useParams(); // Получаем id машины из URL
  const [car, setCar] = useState(null); // Состояние для хранения данных о машине
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { users, getUser } = useAuth();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [comments, setComments] = useState([]); // Список комментариев
  const [newComment, setNewComment] = useState(""); // Новый комментарий

  useEffect(() => {
    getUser(); // Загружаем данные пользователя
  }, []);

  // GET-запрос для получения данных о машине
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

  // GET-запрос для получения комментариев
  useEffect(() => {
    fetch(`http://localhost:8080/comments/car/${carId}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке комментариев");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [carId]);

  // Функция для добавления комментария
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Комментарий не может быть пустым.");
      return;
    }

    const commentData = {
      userId: users?.id,
      content: newComment,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/comments/car/${carId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при добавлении комментария.");
      }

      const addedComment = await response.json();
      setComments((prevComments) => [...prevComments, addedComment]); // Обновляем список комментариев
      setNewComment(""); // Очищаем поле ввода
    } catch (error) {
      console.error("Ошибка:", error.message);
      alert("Не удалось добавить комментарий.");
    }
  };

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

  return (
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
            style={{ width: "570px", height: "400px" }}
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
          <div style={{ display: "flex", margin: "6px" }}>
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

      {/* Секция комментариев */}
      <div
        style={{
          margin: "20px auto",
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
            fontSize: "20px",
          }}
        >
          Комментарии
        </Typography>
        <List>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "#fff",
                borderRadius: "6px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItem>
                <ListItemText
                  primary={
                    <Typography
                      style={{
                        fontWeight: "bold",
                        color: "#555",
                        fontSize: "18px",
                      }}
                    >
                      {comment.userName}
                    </Typography>
                  }
                  secondary={
                    <Typography style={{ color: "#666", fontSize: "14px" }}>
                      {comment.content}
                    </Typography>
                  }
                />
              </ListItem>
            </div>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Добавить комментарий"
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            InputLabelProps={{ style: { color: "#555" } }}
            InputProps={{
              style: {
                backgroundColor: "#fff",
                borderRadius: "6px",
                padding: "10px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddComment}
            style={{
              marginTop: "10px",
              background: "linear-gradient(90deg, #007BFF 0%, #00D4FF 100%)",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              fontWeight: "bold",
              border: "none",
              textTransform: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Отправить
          </Button>
        </Box>
      </div>

      <Footer />
    </div>
  );
}

export default ModelsDetail;
