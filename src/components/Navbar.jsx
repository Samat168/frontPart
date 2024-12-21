import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import Logo from "../images/logo/logo10.png";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { ADMIN } from "../helpers/consts";
// Подключаем контекст для получения currentUser

function Navbar() {
  const [nav, setNav] = useState(false);
  const { currentUser, getUser, users, logout } = useAuth();
  const [avatar, setAvatar] = useState(users?.avatar);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate;
  const openNav = () => {
    setNav(!nav);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget); // Открываем меню
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null); // Закрываем меню
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                О нас
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Модели
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/testimonials">
                Отзывы
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/contact">
                Контакты
              </Link>
            </li>
            <li>
              {currentUser ? (
                <span onClick={logout}>Выйти ({currentUser})</span> // Если пользователь авторизован, выводим его email
              ) : (
                <>
                  <Link onClick={openNav} to="/login">
                    Войти
                  </Link>
                  <Link onClick={openNav} to="/register">
                    Регистрация
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>

        {/* desktop */}
        <div
          className="navbar"
          style={{
            backgroundColor: "black",
            maxWidth: "140rem",
            height: "56px",
          }}
        >
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img
                src={Logo}
                alt="logo-img"
                style={{
                  // clipPath: "inset(0 50% 0 0)", // Обрезает правую часть изображения
                  // width: "100%", // Чтобы логотип занимал всю доступную ширину
                  width: "130px",
                  height: "60px",
                }}
              />
            </Link>
          </div>

          <ul className="navbar__links">
            <li>
              <Link
                className="home-link"
                to="/"
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: "21px",
                  fontWeight: "400",
                }}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                className="about-link"
                to="/about"
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: "21px",
                  fontWeight: "400",
                }}
              >
                О нас
              </Link>
            </li>
            <li>
              <Link
                className="models-link"
                to="/models"
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: "21px",
                  fontWeight: "400",
                }}
              >
                Машины
              </Link>
            </li>
            <li>
              <Link
                className="testi-link"
                to="/testimonials"
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: "21px",
                  fontWeight: "400",
                }}
              >
                Отзывы
              </Link>
            </li>
            <li>
              <Link
                className="contact-link"
                to="/contact"
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: "21px",
                  fontWeight: "400",
                }}
              >
                Контакты
              </Link>
            </li>
            <li>
              {currentUser && currentUser === ADMIN && (
                <Link
                  className="contact-link"
                  to="/admin"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    lineHeight: "21px",
                    fontWeight: "400",
                  }}
                >
                  Админ Панель
                </Link>
              )}
            </li>
            <li>
              {currentUser && currentUser === ADMIN && (
                <Link
                  className="contact-link"
                  to="/manager"
                  style={{
                    color: "#fff",
                    fontSize: "18px",
                    lineHeight: "21px",
                    fontWeight: "400",
                  }}
                >
                  Manager
                </Link>
              )}
            </li>
          </ul>
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            {currentUser ? (
              <div style={{ display: "flex" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" />
                  </IconButton>
                </Tooltip>
                {/* Добавляем иконку платежа */}
                <Tooltip title="Платежи">
                  <IconButton sx={{ mt: 1 }}>
                    <Link to="/cart">
                      <PaymentIcon style={{ cursor: "pointer" }} />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/profile">
                      <Typography
                        textAlign="center"
                        sx={{
                          color: "black",
                          fontSize: "18px",
                          lineHeight: "21px",
                          fontWeight: "400",
                        }}
                      >
                        Профиль
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      logout();
                    }}
                  >
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "black",
                        fontSize: "18px",
                        lineHeight: "21px",
                        fontWeight: "400",
                      }}
                    >
                      Выйти
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Link
                  className="navbar__buttons__sign-in"
                  to="/login"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",

                    fontSize: "18px",
                    lineHeight: "21px",
                    fontWeight: "400",
                  }}
                >
                  Войти
                </Link>
                <Link
                  className="navbar__buttons__register"
                  to="/register"
                  style={{
                    color: "black",
                    textDecoration: "none",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    fontSize: "18px",
                    lineHeight: "21px",
                    fontWeight: "400",
                    boxShadow: "none",
                  }}
                >
                  Регистрация
                </Link>
              </Box>
            )}
          </Box>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
