import { Link } from "react-router-dom";
import BgShape from "../images/hero/hero-bg.png";
import HeroCar from "../images/hero/main-car.png";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  const bookBtn = () => {
    document
      .querySelector("#booking-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <Typography
            sx={{
              color: "#fff",
              position: "absolute",
              top: "45%",
              zIndex: "1",
              fontSize: "70px",
              lineHeight: "89px",
              fontWeight: "700",
              width: "46%",
            }}
          >
            Спланируйте поездку сейчас
          </Typography>
          <div className="hero-content__text__btns">
            <Link
              className="hero-content__text__btns__book-ride"
              to="/models"
              style={{
                position: "absolute",
                top: "76%",
                zIndex: "1",
                backgroundColor: "white",
                color: "black",
                border: "black",
                boxShadow: "none",
              }}
            >
              Список машин &nbsp; <i className="fa-solid fa-circle-check"></i>
            </Link>
          </div>

          <img
            src="https://belkacar.ru/uploads/Photo%20main/photo_1_full.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100vh", // Makes the image cover the full screen height
              objectFit: "cover", // Ensures the image covers the screen without distortion
              position: "absolute", // Positions the image at the top-left corner
              top: "0",
              left: "0",
              // Puts the image behind other content
            }}
          />

          {/* <img className="bg-shape" src={BgShape} alt="bg-shape" /> */}
          {/* <div className="hero-content">
            <div className="hero-content__text">
              <h4>Спланируйте поездку сейчас</h4>
              <h1>
                <span>Экономьте</span> с нашим прокатом автомобилей
              </h1>

              <div className="hero-content__text__btns">
                <Link
                  className="hero-content__text__btns__book-ride"
                  to="/models"
                >
                  Список машин &nbsp;{" "}
                  <i className="fa-solid fa-circle-check"></i>
                </Link> */}
          {/* <Link className="hero-content__text__btns__learn-more" to="/">
                  Learn More &nbsp; <i className="fa-solid fa-angle-right"></i>
                </Link> */}
          {/* </div>
            </div>

            <img
              src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png"
              alt="car-img"
              className="hero-content__car-img"
            />
          </div>
        </div>

        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          <i className="fa-solid fa-angle-up"></i> */}
        </div>
      </section>
    </>
  );
}

export default Hero;
