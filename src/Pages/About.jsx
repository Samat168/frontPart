import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import PlanTrip from "../components/PlanTrip";
import AboutMain from "../images/about/about-main.jpg";
import Box1 from "../images/about/icon1.png";
import Box2 from "../images/about/icon2.png";
import Box3 from "../images/about/icon3.png";

function About() {
  return (
    <>
      <section className="about-page">
        <HeroPages name="About" />
        <div className="container">
          <div className="about-main">
            <img
              className="about-main__img"
              src={AboutMain}
              alt="car-renting"
            />
            <div className="about-main__text">
              <h3>О компании</h3>
              <h3>
                Добро пожаловать в SuperCar— вашу надежную компанию по аренде
                автомобилей! Мы предоставляем качественные услуги для тех, кто
                ценит комфорт, безопасность и свободу передвижения.
              </h3>
              <p>
                Почему выбирают нас? Широкий выбор автомобилей В нашем автопарке
                представлены автомобили различных классов: от компактных моделей
                для городских поездок до премиальных авто для деловых встреч и
                путешествий. Простота аренды Мы сделали процесс бронирования
                максимально удобным: всего несколько кликов, и автомобиль уже
                ждет вас. Доступные цены Прозрачная ценовая политика без скрытых
                платежей позволяет выбрать автомобиль, который подойдет вашему
                бюджету. Поддержка клиентов 24/7 Наша команда всегда готова
                помочь, будь то вопросы по аренде или техническая поддержка в
                дороге. Безопасность и надежность Все наши автомобили проходят
                регулярное техническое обслуживание, чтобы вы могли наслаждаться
                поездкой без лишних забот.
              </p>
              <div className="about-main__text__icons">
                <div className="about-main__text__icons__box">
                  <img src={Box1} alt="car-icon" />
                  <span>
                    <h4>20</h4>
                    <p>Типов автомобилей</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box2} alt="car-icon" />
                  <span>
                    <h4>10</h4>
                    <p>Пунктов прокатов</p>
                  </span>
                </div>
                <div className="about-main__text__icons__box">
                  <img src={Box3} alt="car-icon" className="last-fk" />
                  <span>
                    <h4>10</h4>
                    <p>Ремонтная мастерская</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <PlanTrip />
        </div>
      </section>
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
    </>
  );
}

export default About;
