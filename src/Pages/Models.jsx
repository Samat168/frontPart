import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import ControlledRadioButtonsGroup from "../components/ControlledRadioButtonsGroup";
import "../styles/AdminStyles/ModelStyle.css"; // Исправьте путь и расширение

function Models() {
  const [cars, setCars] = useState([]); // Состояние для хранения списка машин
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для текста поиска
  const navigate = useNavigate();
  // GET-запрос к серверу
  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Запрос на удаление машины
    fetch(`http://localhost:8080/cars/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при удалении автомобиля");
        }
        // Если удаление прошло успешно, обновляем список машин
        setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      })
      .catch((err) => {
        console.error("Ошибка при удалении:", err);
        alert("Не удалось удалить машину");
      });
  };

  const handleEdit = (id) => {
    // Переход на страницу редактирования с ID автомобиля
    navigate(`/edit-car/${id}`);
  };

  // Фильтрация машин по введённому названию
  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const options = [
    { title: "Седан", firstLetter: "С" },
    { title: "Минивен", firstLetter: "М" },
    { title: "Внедорожник", firstLetter: "В" },
  ];

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <section className="models-section">
        <HeroPages name="Машины" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            margin: "5px 20px 20px 20px",
          }}
        >
          <div style={{ width: "25%", margin: "20px", marginLeft: "50px" }}>
            <h4>Поиск</h4>
            <TextField
              fullWidth
              label="Поиск по названию"
              id="fullWidth"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Обработчик ввода
            />
          </div>
          <ControlledRadioButtonsGroup />
          <div>
            <Autocomplete
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="По типу машины" />
              )}
              renderGroup={(params) => (
                <li key={params.key}>
                  <div style={{ fontWeight: "bold" }}>{params.group}</div>
                  {params.children}
                </li>
              )}
            />
          </div>
        </div>
        <div className="container">
          <div className="models-div" style={{ width: "100%" }}>
            {filteredCars.map((car) => (
              <div
                className="models-div__card"
                key={car.id}
                style={{ width: "30%" }}
              >
                <div className="models-div__card__img">
                  <img
                    src={`http://localhost:8080/cars/${car.id}/photo`}
                    alt={`${car.make} ${car.model}`}
                  />
                </div>
                <div className="models-div__card__content">
                  <h3>
                    {car.make} {car.model}
                  </h3>
                  <div
                    className="models-div__card__price"
                    style={{
                      fontSize: "18px",
                    }}
                  >
                    <p>Стоимость аренды: {car.price} сом (за сутки)</p>
                  </div>
                  <div className="models-div__card__details">
                    <p>
                      <i className="fa-solid fa-car-side"></i> Тип Машины:{" "}
                      {car.tip}
                    </p>
                  </div>
                  <Link
                    to={`/car/${car.id}`}
                    className="models-div__card__btn"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Забронировать поездку
                  </Link>
                </div>
                <div
                  style={{
                    display: "flex",

                    alignItems: "center",
                    margin: "20px",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    onClick={() => handleDelete(car.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                      width: "40%",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#d32f2f")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#f44336")
                    }
                  >
                    Удалить
                  </Button>
                  <Button
                    onClick={() => handleEdit(car.id)}
                    style={{
                      backgroundColor: "#ffa000",
                      color: "white",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                      width: "40%",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f57c00")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#ffa000")
                    }
                  >
                    Изменить
                  </Button>
                </div>
              </div>
            ))}
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
      </section>
    </>
  );
}

export default Models;
