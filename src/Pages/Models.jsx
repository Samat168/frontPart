import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link, useNavigate } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import ControlledRadioButtonsGroup from "../components/ControlledRadioButtonsGroup";
import "../styles/AdminStyles/ModelStyle.css"; // Исправьте путь и расширение
import { useAuth } from "../context/AuthContextProvider";
import { ADMIN } from "../helpers/consts";

function Models() {
  const [cars, setCars] = useState([]); // Состояние для хранения списка машин
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для текста поиска
  const [filteredCars, setFilteredCars] = useState([]); // Состояние для отфильтрованных машин
  const [selectedType, setSelectedType] = useState(""); // Состояние для типа машины
  const navigate = useNavigate();
  const { currentUser, getUser, users } = useAuth();
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
        setFilteredCars(data); // При загрузке данных сразу показываем все машины
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getUser();
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

  // Обработчик ввода
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterCars(); // Фильтруем машины после изменения поискового запроса
  };

  // Функция фильтрации
  const filterCars = () => {
    let filtered = cars;

    // Фильтрация по названию
    if (searchQuery) {
      filtered = filtered.filter((car) =>
        car.make.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтрация по типу
    if (selectedType) {
      filtered = filtered.filter((car) => car.tip === selectedType);
    }

    setFilteredCars(filtered); // Обновляем состояние с отфильтрованными машинами
  };
  // Обработчик фильтрации по типу
  const handleFilter = (filteredCars) => {
    setFilteredCars(filteredCars);
  };

  // Сбросить фильтрацию и показать все машины
  const handleShowAll = () => {
    setSearchQuery(""); // Сбросить поисковый запрос
    setSelectedType(""); // Сбросить выбранный тип машины
    setFilteredCars(cars); // Показать все машины
  };

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
            <Button
              variant="contained"
              onClick={handleShowAll}
              style={{
                width: "29%",
                color: "white",
                marginBottom: "20px",

                borderRadius: "5px",
                transition: "background-color 0.3s ease", // Плавная анимация для кнопки
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#ffa000")} // Оранжевый при наведении
              onMouseOut={(e) => (e.target.style.backgroundColor = "black")} // Возврат к черному
            >
              Показать все машины
            </Button>
            <h4>Поиск</h4>
            <TextField
              fullWidth
              label="Поиск по названию"
              id="fullWidth"
              value={searchQuery}
              onChange={handleSearchChange} // Обработчик ввода
              sx={{ marginBottom: "40px" }}
              style={{
                color: "white", // белый текст
              }}
            />
          </div>
          <ControlledRadioButtonsGroup onFilter={handleFilter} />

          <div style={{ marginLeft: "38px" }}>
            <Autocomplete
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="По типу машины"
                  style={{ color: "white" }}
                />
              )}
              renderGroup={(params) => (
                <li key={params.key}>
                  <div style={{ fontWeight: "bold", color: "white" }}>
                    {params.group}
                  </div>
                  {params.children}
                </li>
              )}
              onChange={(event, newValue) =>
                setSelectedType(newValue?.title || "")
              } // Обновить тип
            />
          </div>
        </div>

        <div className="container">
          <div className="models-div" style={{ width: "100%" }}>
            {filteredCars.map((car) => (
              <div
                className="models-div__card"
                key={car.id}
                style={{
                  width: "32%",
                  borderRadius: "6%",
                  border: "1px solid grey",
                  transition: "transform 0.3s ease", // Плавная анимация для карточки
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                } // Увеличение при наведении
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                } // Возврат к нормальному размеру
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
                    style={{
                      backgroundColor: "black", // черный фон
                      color: "white", // белый текст
                      padding: "10px",
                      borderRadius: "20px",
                      transition: "background-color 0.3s ease", // Плавная анимация для кнопки
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "rgb(63 169 227)")
                    } // Оранжевый при наведении
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "black")
                    } // Возврат к черному
                  >
                    Забронировать поездку
                  </Link>
                </div>
                {currentUser && currentUser === ADMIN && (
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
                        backgroundColor: "rgb(63 169 227)",
                        color: "white",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s ease",
                        width: "40%",
                      }}
                    >
                      Изменить
                    </Button>
                  </div>
                )}
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
