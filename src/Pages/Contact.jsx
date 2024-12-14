import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { useAuth } from "../context/AuthContextProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate

function Contact() {
  const { currentUser, firestore, firebase, users, getUser } = useAuth();
  const [value, setValue] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  const [successMessage, setSuccessMessage] = useState(""); // Стейт для успешного сообщения
  const navigate = useNavigate(); // Хук для навигации

  useEffect(() => {
    getUser();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку формы

    if (!value || !valuePhone) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Проверяем, есть ли currentUser и users
    if (!users) {
      console.log("Ошибка: данные пользователя не загружены.");
      return;
    }

    try {
      await firestore.collection("messages").add({
        uid: users.email, // Предполагается, что currentUser имеет свойство uid
        displayName: users.username, // Предполагается, что users имеет свойство username
        text: value,
        phone: valuePhone,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setValue("");
      setValuePhone(""); // Очищаем поля после отправки

      // Устанавливаем сообщение об успешной отправке
      setSuccessMessage("Вы успешно отправили сообщение!");

      // Перенаправляем на главную страницу через 3 секунды
      setTimeout(() => {
        navigate("/"); // Перенаправление на главную страницу
      }, 3000);
    } catch (error) {
      console.log("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <>
      <section className="contact-page">
        <HeroPages name="Контакты" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Нужна дополнительная информация?</h2>
              <p>
                Многогранный профессионал, обладающий опытом в различных
                областях исследований и разработок, а также специалист по
                обучению. Более 15 лет опыта.
              </p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; (996)776-65-03-84
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp;
                supersamat2004@gmail.com
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Кыргызстан,
                Бишкек
              </a>
            </div>
            <div className="contact-div__form">
              <form onSubmit={sendMessage}>
                <label>
                  Номер телефона <b>*</b>
                </label>
                <input
                  type="text"
                  placeholder="996776650384"
                  value={valuePhone}
                  onChange={(e) => setValuePhone(e.target.value)}
                ></input>

                <label>
                  Расскажите нам об этом <b>*</b>
                </label>
                <textarea
                  placeholder="Описание"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                ></textarea>

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp;
                  Отправить сообщение
                </button>
              </form>
            </div>
            {/* Отображаем успешное сообщение */}
            {successMessage && (
              <div style={styles.successMessage}>
                <p>{successMessage}</p>
              </div>
            )}
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

// Стили для сообщения об успешной отправке
const styles = {
  successMessage: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Contact;
