import { useState } from "react";

function Faq() {
  const [activeQ, setActiveQ] = useState("q1");

  const openQ = (id) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id ? "active-answer" : "";
  };

  const getClassQuestion = (id) => {
    return activeQ === id ? "active-question" : "";
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-content__title">
              <h5>FAQ</h5>
              <h2>Часто задаваемые вопросы</h2>
              <p>
                Часто задаваемые вопросы о процессе бронирования аренды
                автомобиля на нашем веб-сайте: ответы на распространенные
                вопросы и вопросы.
              </p>
            </div>

            <div className="all-questions">
              <div className="faq-box">
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__question  ${getClassQuestion("q1")}`}
                >
                  <p>
                    1. Что особенного в сравнении предложений по аренде
                    автомобилей?
                  </p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__answer ${getClassAnswer("q1")}`}
                >
                  Сравнение предложений по аренде автомобилей важно, поскольку
                  оно помогает найти лучшее предложение, соответствующее вашему
                  бюджету и требованиям, гарантируя, что вы получите
                  максимальную отдачу от своих денег. Сравнивая различные
                  варианты, вы можете найти предложения, предлагающие более
                  низкие цены, дополнительные услуги или лучшие модели
                  автомобилей. Вы можете найти предложения по аренде
                  автомобилей, исследуя Интернет и сравнивая цены различных
                  компаний по аренде.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__question ${getClassQuestion("q2")}`}
                >
                  <p>2. Как мне найти предложения по аренде автомобилей?</p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__answer ${getClassAnswer("q2")}`}
                >
                  Вы можете найти предложения по аренде автомобилей, исследуя
                  Интернет и сравнение цен от разных прокатных компаний.
                  Веб-сайты такие как Expedia, Kayak и Travelocity, позволяют
                  сравнивать цены и просмотреть доступные варианты аренды. Это
                  также рекомендуется подписаться на рассылку новостей по
                  электронной почте и следить за прокатом автомобильные компании
                  в социальных сетях, чтобы быть в курсе любых особых
                  предложения или акции.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__question ${getClassQuestion("q3")}`}
                >
                  <p>
                    3. Как мне найти такие низкие цены на аренду автомобиля?
                  </p>
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__answer ${getClassAnswer("q3")}`}
                >
                  Бронируйте заранее: заблаговременное бронирование автомобиля
                  часто приводит к снижению цен. Сравнить цены от нескольких
                  компании: используйте такие веб-сайты, как Kayak, Expedia или
                  Travelocity, чтобы Сравните цены нескольких компаний по
                  прокату автомобилей. Искать коды скидок и купоны: поиск кодов
                  скидок и купоны, которые можно использовать для снижения
                  стоимости аренды. Аренда из местоположения за пределами
                  аэропорта иногда может привести к снижению цены.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
