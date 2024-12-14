import SelectCar from "../images/plan/icon1.png";
import Contact from "../images/plan/icon2.png";
import Drive from "../images/plan/icon3.png";

function PlanTrip() {
  return (
    <>
      <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Спланируйте поездку сейчас</h3>
              <h2>Быстрая и простая аренда автомобиля</h2>
            </div>

            <div className="plan-container__boxes">
              <div className="plan-container__boxes__box">
                <img src={SelectCar} alt="icon_img" />
                <h3>Выбрать автомобиль</h3>
                <p>
                  Мы предлагаем большой выбор транспортных средств для всех
                  ваших потребностей вождения. У нас есть идеальный автомобиль,
                  отвечающий вашим потребностям
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src={Contact} alt="icon_img" />
                <h3>Связаться с оператором</h3>
                <p>
                  Наши знающие и дружелюбные операторы всегда готовы помогите с
                  любыми вопросами или проблемами
                </p>
              </div>

              <div className="plan-container__boxes__box">
                <img src={Drive} alt="icon_img" />
                <h3>Поехали</h3>
                <p>
                  Если вы отправляетесь в путь, мы вас прикроем с нашим широким
                  спектром автомобилей
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
