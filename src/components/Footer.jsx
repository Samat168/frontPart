function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footer-content">
            <ul className="footer-content__1">
              <li>
                <span>Super</span> Car
              </li>
              <li>
                Мы предлагаем большой выбор транспортных средств для всех ваших
                потребностей вождения. У нас есть идеальный автомобиль,
                отвечающий вашим потребностям.
              </li>
              <li>
                <a href="tel:123456789">
                  <i className="fa-solid fa-phone"></i> &nbsp; (996)
                  -776-65-03-84
                </a>
              </li>

              <li>
                <a
                  href="mailto: 
                supersamat2004@gmail.com"
                >
                  <i className="fa-solid fa-envelope"></i>
                  &nbsp; supersamat2004@gmail.com
                </a>
              </li>
            </ul>

            {/* <ul className="footer-content__2">
              <li>Company</li>
              <li>
                <a href="#home">Gallery</a>
              </li>
              <li>
                <a href="#home">Careers</a>
              </li>
              <li>
                <a href="#home">Mobile</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">How we work</a>
              </li>
            </ul> */}

            <ul className="footer-content__2">
              <li>Время работы</li>
              <li>Понедельник - Пятница: 9:00 - 18:00</li>
              <li>Суббота : 9:00AM - 13:00PM</li>
              <li>Воскресенье : Выходной</li>
            </ul>
            {/* 
            <ul className="footer-content__2">
              <li>Subscription</li>
              <li>
                <p>Subscribe your Email address for latest news & updates.</p>
              </li>
              <li>
                <input type="email" placeholder="Enter Email Address"></input>
              </li>
              <li>
                <button className="submit-email">Submit</button>
              </li>
            </ul> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
