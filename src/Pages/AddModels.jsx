import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useProduct } from "../context/ProductContextProvider";
import HeroPages from "../components/HeroPages";
import "../styles/AdminStyles/AddModelsStyle.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
// Регистрируем модули Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
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
  const [users, setUsers] = useState([]); // State to store users
  const [bookings, setBookings] = useState([]); // State to store bookings
  const [analytics, setAnalytics] = useState({
    popularCars: [],
    lastMonthBookings: [],
    totalProfit: 0,
  });
  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Assuming the response is an array of users
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data); // Assuming the response is an array of bookings
          // Compute analytics
          computeAnalytics(data);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

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

  // Compute analytics
  const computeAnalytics = (bookings) => {
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    // Filter bookings for the last month
    const lastMonthBookings = bookings.filter(
      (booking) => new Date(booking.startDate) >= lastMonthDate
    );

    // Calculate total profit
    const totalProfit = lastMonthBookings.reduce(
      (sum, booking) => sum + booking.car.price,
      0
    );

    // Calculate popular cars
    const carFrequency = {};
    bookings.forEach((booking) => {
      const car = `${booking.car.make} ${booking.car.model}`;
      carFrequency[car] = (carFrequency[car] || 0) + 1;
    });
    const popularCars = Object.entries(carFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([car, count]) => ({ car, count }));

    setAnalytics({ popularCars, lastMonthBookings, totalProfit });
  };

  // Функция для скачивания отчета
  const downloadExcel = () => {
    // Подготовка данных для Excel
    const popularCarsSheet = analytics.popularCars.map((car) => ({
      Машина: car.car,
      "Количество бронирований": car.count,
    }));

    const lastMonthBookingsSheet = analytics.lastMonthBookings.map(
      (booking) => ({
        "Имя пользователя": booking.user.username,
        Машина: `${booking.car.make} ${booking.car.model}`,
        "Дата начала": new Date(booking.startDate).toLocaleDateString(),
        "Дата конца": new Date(booking.endDate).toLocaleDateString(),
        Цена: `${booking.car.price}₽`,
      })
    );

    const totalProfitSheet = [
      {
        Показатель: "Общая прибыль",
        Значение: `${analytics.totalProfit}₽`,
      },
    ];

    // Создание книги (workbook) и листов (worksheets)
    const workbook = XLSX.utils.book_new();
    const popularCarsWorksheet = XLSX.utils.json_to_sheet(popularCarsSheet);
    const lastMonthBookingsWorksheet = XLSX.utils.json_to_sheet(
      lastMonthBookingsSheet
    );
    const totalProfitWorksheet = XLSX.utils.json_to_sheet(totalProfitSheet);

    XLSX.utils.book_append_sheet(
      workbook,
      popularCarsWorksheet,
      "Популярные машины"
    );
    XLSX.utils.book_append_sheet(
      workbook,
      lastMonthBookingsWorksheet,
      "Бронирования за месяц"
    );
    XLSX.utils.book_append_sheet(
      workbook,
      totalProfitWorksheet,
      "Общая прибыль"
    );

    // Генерация и скачивание файла
    XLSX.writeFile(workbook, "Отчеты.xlsx");
  };

  return (
    <div>
      <HeroPages name="Админ панель" />
      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}>
          Список пользователей
        </p>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Лиценция водителя</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.driverLicense}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}>
          Список бронирований
        </p>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Имя пользователя</th>
              <th>Начало бронирования</th>
              <th>Конец бронирования</th>
              <th>Машина</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{booking.user.username}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>{booking.car.make}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* Отчётность */}
        <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}>
            Отчётность
          </h2>

          <table className="styled-table">
            <thead>
              <tr>
                <th>Машина</th>
                <th>Количество бронирований</th>
              </tr>
            </thead>
            <tbody>
              {analytics.popularCars.map((car, index) => (
                <tr key={index}>
                  <td>{car.car}</td>
                  <td>{car.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Другие элементы */}
          <div>
            <h2
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              Популярные машины
            </h2>

            {/* Диаграмма */}
            <div style={{ width: "80%", margin: "auto" }}>
              <Bar
                data={{
                  labels: analytics.popularCars.map((car) => car.car), // Названия машин
                  datasets: [
                    {
                      label: "Количество бронирований",
                      data: analytics.popularCars.map((car) => car.count), // Количество бронирований
                      backgroundColor: "rgba(75, 192, 192, 0.6)", // Цвет
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Популярные машины",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Последние бронирования за месяц */}
          <h3 style={{ fontSize: "25px" }}>Последние бронирования за месяц</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Имя пользователя</th>
                <th>Машина</th>
                <th>Дата начала</th>
                <th>Дата конца</th>
                <th>Цена</th>
              </tr>
            </thead>
            <tbody>
              {analytics.lastMonthBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.user.username}</td>
                  <td>{`${booking.car.make} ${booking.car.model}`}</td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>{booking.car.price}₽</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Общая прибыль */}
          <h3 style={{ fontSize: "25px" }}>Общая прибыль</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "green" }}>
            {analytics.totalProfit}₽
          </p>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button
          onClick={downloadExcel}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Скачать отчет
        </button>
      </div>

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
