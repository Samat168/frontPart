import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Input,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { currentUser, getUser, users, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // Состояние для нового файла аватара
  const [avatar, setAvatar] = useState(users?.avatar); // Инициализация аватара
  const [editMode, setEditMode] = useState(false); // Статус редактирования
  const [newUsername, setNewUsername] = useState(users?.username || "");
  const [newPhone, setNewPhone] = useState(users?.phone || "");
  const [newDriverLicense, setNewDriverLicense] = useState(
    users?.driverLicense || ""
  );
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (users?.id && bookings.length === 0) {
      setLoading(true);
      fetch(`http://localhost:8080/api/bookings/user/${users.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Не удалось загрузить бронирования");
          }
          return response.json();
        })
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [users?.id, bookings.length]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  const handleAvatarUpload = () => {
    if (!avatarFile) {
      alert("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    const formData = new FormData();
    formData.append("file", avatarFile);

    fetch(`http://localhost:8080/users/${users.id}/avatar/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ответ от сервера:", data); // Логируем ответ от сервера
        if (data.avatar) {
          setAvatar(data.avatar); // Обновляем аватар в состоянии
          alert("Аватар успешно обновлен!");
        }
      })
      .catch((error) => {
        console.error("Ошибка при загрузке аватара:", error);
        navigate("/"); // Если ошибка при загрузке аватара, перенаправляем пользователя на главную
      });
  };

  const getStatusButton = (status) => {
    if (status === "PENDING") {
      return (
        <Button variant="contained" color="error">
          {status}
        </Button>
      );
    } else if (status === "CONFIRMED") {
      return (
        <Button variant="contained" color="success">
          {status}
        </Button>
      );
    } else {
      return <Typography>{status}</Typography>;
    }
  };

  const handleUpdateProfile = () => {
    const updatedData = {
      username: newUsername,
      phone: newPhone,
      driverLicense: newDriverLicense,
    };

    fetch(`http://localhost:8080/users/${users.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при обновлении профиля");
        }
        return response.json();
      })
      .then(() => {
        alert("Данные успешно обновлены!");
        getUser();
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении профиля:", error);
        alert("Произошла ошибка при обновлении данных.");
      });
  };

  // Фильтрация только подтвержденных бронирований
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  );

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginTop: "90px", textAlign: "center", fontWeight: "bold" }}
      >
        Ваш профиль
      </Typography>

      {/* Информация о пользователе */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={
            avatar
              ? `http://localhost:8080/${avatar}`
              : `http://localhost:8080/users/${users.id}/avatar`
          }
          sx={{
            width: 120,
            height: 120,
            marginBottom: "10px",
          }}
        />
        <Button variant="outlined" component="label" sx={{ marginTop: "10px" }}>
          <Input type="file" hidden onChange={handleAvatarChange} />
        </Button>
      </Box>

      {/* Форма для загрузки нового аватара */}
      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handleAvatarUpload}
          disabled={!avatarFile}
        >
          Загрузить аватар
        </Button>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Typography sx={{ fontSize: "19px", textAlign: "center" }}>
          Личные данные
        </Typography>

        {editMode ? (
          <Box>
            <TextField
              label="Имя"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Телефон"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              sx={{ marginBottom: "10px", width: "100%" }}
            />
            <TextField
              label="Водительское удостоверение"
              value={newDriverLicense}
              onChange={(e) => setNewDriverLicense(e.target.value)}
              sx={{ marginBottom: "20px", width: "100%" }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Button variant="contained" onClick={handleUpdateProfile}>
                Сохранить изменения
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Отменить
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography sx={{ fontSize: "19px" }}>
              Имя профиля: {users?.username || "Неизвестно"}
            </Typography>
            <Typography sx={{ fontSize: "19px" }}>
              Ваш номер телефона: {users?.phone || "Неизвестно"}
            </Typography>
            <Typography sx={{ fontSize: "19px" }}>
              Ваш DriverLisence: {users?.driverLicense || "Неизвестно"}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setEditMode(true)}
                sx={{ marginRight: "10px" }}
              >
                Редактировать
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* История бронирований */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ fontSize: "20px", marginTop: "20px", textAlign: "center" }}
        >
          История бронирования
        </Typography>

        {loading ? (
          <Typography>Загрузка...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : confirmedBookings.length === 0 ? (
          <Typography>У вас нет подтвержденных бронирований.</Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", width: "100%" }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="booking history table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Машина</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Дата начала</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Дата окончания</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Цена</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Предоплата</strong>
                  </TableCell>
                  <TableCell sx={{ fontSize: "20px" }}>
                    <strong>Статус</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {confirmedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {`${booking.carMake} ${booking.carModel}`}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {booking.startDate}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {booking.endDate}
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {booking.totalPrice} сом
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {booking.advancePayment} сом
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }}>
                      {getStatusButton(booking.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
