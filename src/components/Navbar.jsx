import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
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
  }, [getUser]);

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
        <div className="navbar">
          <div className="navbar__img"></div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className="about-link" to="/about">
                О нас
              </Link>
            </li>
            <li>
              <Link className="models-link" to="/models">
                Машины
              </Link>
            </li>
            <li>
              <Link className="testi-link" to="/testimonials">
                Отзывы
              </Link>
            </li>
            <li>
              <Link className="contact-link" to="/contact">
                Контакты
              </Link>
            </li>
            <li>
              <Link className="contact-link" to="/admin">
                Админ Панель
              </Link>
            </li>
            <li>
              <Link className="contact-link" to="/manager">
                Manager
              </Link>
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
                          fontSize: "16px",
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
                        fontSize: "16px",
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
                  fontSize: "15px",
                }}
              >
                <Link
                  className="navbar__buttons__sign-in"
                  to="/login"
                  sx={{
                    margin: "20px",
                  }}
                >
                  Войти
                </Link>
                <Link className="navbar__buttons__register" to="/register">
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
