import React, { useState, useEffect } from "react";
import "../styles/AdminStyles/PaymentForm.css";
import { useAuth } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Modal,
  TextField,
  Button,
} from "@mui/material";

const PaymentForm = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUser, users } = useAuth();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (users?.id) {
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
  }, [users?.id]);

  const handlePaymentClick = (booking) => {
    console.log("Selected booking:", booking); // Логируем выбранное бронирование
    setSelectedBooking(booking);
    setOpenPaymentModal(true);
  };
  const handlePaymentSubmit = () => {
    if (!selectedBooking) return;

    fetch(
      `http://localhost:8080/api/bookings/confirmed/${selectedBooking.bookingId}`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Не удалось подтвердить оплату");
        }
        return response.json();
      })
      .then(() => {
        alert("Оплата успешно подтверждена!");
        setOpenPaymentModal(false);
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.bookingId === selectedBooking.bookingId
              ? { ...b, status: "CONFIRMED" }
              : b
          )
        );
      })
      .catch((err) => {
        console.error("Ошибка при подтверждении оплаты:", err); // Логируем только ошибку
        alert(`Ошибка: ${err.message}`);
      });
  };

  const getStatusButton = (status) => {
    switch (status) {
      case "CONFIRMED":
        return <span style={{ color: "green" }}>Подтверждено</span>;
      case "PENDING":
        return <span style={{ color: "orange" }}>В ожидании</span>;
      case "CANCELLED":
        return <span style={{ color: "red" }}>Отменено</span>;
      default:
        return <span>Неизвестный статус</span>;
    }
  };

  if (loading) {
    return <div>Загрузка данных о бронированиях...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  );

  if (pendingBookings.length === 0) {
    return (
      <div
        style={{
          position: "absolute",
          top: "140px",
          fontSize: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        У вас нет бронирований со статусом "в ожидании".
      </div>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginTop: "90px", textAlign: "center", fontWeight: "bold" }}
      >
        Оплата
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "20px",
          width: "100%",
          backgroundColor: "#bdcede",
        }}
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
              <TableCell sx={{ fontSize: "20px" }}>
                <strong>Действия</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingBookings.map((booking) => (
              <TableRow key={booking.bookingId}>
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
                <TableCell>
                  <button
                    onClick={() => handlePaymentClick(booking)}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#fa4226",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Оплатить
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for payment */}
      <Modal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        aria-labelledby="payment-form-title"
        aria-describedby="payment-form-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" id="payment-form-title" gutterBottom>
            Введите данные для оплаты
          </Typography>
          <TextField
            label="Номер карты"
            fullWidth
            margin="normal"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <TextField
            label="Дата окончания (MM/YY)"
            fullWidth
            margin="normal"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <TextField
            label="CVV"
            fullWidth
            margin="normal"
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <TextField
            label="Имя держателя карты"
            fullWidth
            margin="normal"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => setOpenPaymentModal(false)}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaymentSubmit}
            >
              Оплатить
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentForm;
