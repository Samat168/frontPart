import Img2 from "../images/testimonials/pfp1.jpg";
import Img3 from "../images/testimonials/pfp2.jpg";

function Testimonials() {
  return (
    <>
      <section
        className="testimonials-section"
        style={{ backgroundColor: "#dbded7" }}
      >
        <div className="container">
          <div className="testimonials-content">
            <div className="testimonials-content__title">
              <h2>Отзывы клиентов</h2>
              <p style={{ color: "black" }}>
                Узнайте, какое положительное влияние мы оказали на наших
                клиентов, прочитав их отзывы. Наши клиенты уже оценили наши
                услуги и результаты и с радостью поделятся с вами своим
                положительным опытом.
              </p>
            </div>

            <div className="all-testimonials">
              <div className="all-testimonials__box" style={{ width: "30%" }}>
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p style={{ fontSize: "17px" }}>
                  Мы арендовали автомобиль на этом сайте и получили потрясающие
                  впечатления! Бронирование прошло легко, а ставки аренды были
                  очень доступными
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img
                      src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
                      alt="user_img"
                    />
                    <span>
                      <h4>Кадырова Айжан</h4>
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="all-testimonials__box box-2"
                style={{ width: "30%" }}
              >
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p style={{ fontSize: "17px" }}>
                  Машина была в отличном состоянии, что сделало нашу поездку еще
                  лучше. Очень рекомендую этот сайт по прокату автомобилей!
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img
                      src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
                      alt="user_img"
                    />
                    <span>
                      <h4>Мамбетова Мариям</h4>
                    </span>
                  </div>
                </div>
              </div>
              <div className="all-testimonials__box" style={{ width: "30%" }}>
                <span className="quotes-icon">
                  <i className="fa-solid fa-quote-right"></i>
                </span>
                <p style={{ fontSize: "17px" }}>
                  Мы арендовали автомобиль на этом сайте и получили потрясающие
                  впечатления! Бронирование прошло легко, а ставки аренды были
                  очень доступными
                </p>
                <div className="all-testimonials__box__name">
                  <div className="all-testimonials__box__name__profile">
                    <img
                      src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
                      alt="user_img"
                    />
                    <span>
                      <h4>Талантбеков Самат</h4>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
