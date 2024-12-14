import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Testimonials from "../components/Testimonials";

function TestimonialsPage() {
  return (
    <>
      <section
        className="testimonial-page"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        <HeroPages name="Отзывы" />
        <Testimonials />
        <div
          className="contact-div__form"
          style={{ width: "50%", margin: "0 auto", backgroundColor: "#f8f8f8" }}
        >
          <form>
            <label style={{ fontSize: "20px", margin: "0 auto" }}>
              Мой отзыв
            </label>
            <textarea placeholder="Описание"></textarea>

            <button type="submit">
              <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Отправить
              отзыв
            </button>
          </form>
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

export default TestimonialsPage;
