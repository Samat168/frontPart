import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { async } from "q";
// import { Api, Try } from "@mui/icons-material";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getTokens } from "../helpers/functions";
import { jwtDecode } from "jwt-decode";

import { API } from "../helpers/consts";
// import jwt from "jsonwebtoken";
export const authContext = createContext();
export const useAuth = () => useContext(authContext);

const INIT_STATE = {
  favorites: [],
  users: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [currentUser, setCurrentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserID] = useState(0);
  const [errorResset, setErrorResset] = useState(false);
  const { uid } = useParams();

  const navigate = useNavigate();

  async function handleRegister(formData) {
    setLoading(true);
    try {
      await axios.post(`${API}/users/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(formData, email) {
    setLoading(true);
    try {
      // Отправка POST-запроса на сервер для авторизации
      const res = await axios.post(`${API}/users/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json", // Указание типа контента
        },
      });

      // Проверка, что токен существует в ответе
      if (res.data.token) {
        console.log("Token:", res.data.token);

        // Сохраняем токен в localStorage
        localStorage.setItem("tokens", JSON.stringify(res.data)); // сохраняем весь объект с токеном
        localStorage.setItem("email", email); // Сохраняем email в localStorage

        // Устанавливаем текущего пользователя
        setCurrentUser(email);

        // Декодируем токен и извлекаем данные
        decodeToken(res.data.token); // Передаем token в функцию decodeToken

        // Переход на главную страницу после успешного логина
        navigate("/");
      } else {
        console.error("Токен не найден в ответе сервера");
      }
    } catch (error) {
      console.log("Ошибка при логине:", error);
    } finally {
      setLoading(false); // Завершаем процесс загрузки
    }
  }

  const decodeToken = (token) => {
    if (typeof token === "string") {
      try {
        const decodedToken = jwtDecode(token);

        setUserID(decodedToken.sub);
        return decodedToken;
      } catch (error) {
        console.error("Ошибка расшифровки токена:", error);
        return null;
      }
    } else {
      console.error("Токен должен быть строкой, но получен:", token);
      return null;
    }
  };

  //   async function ressetPass(formData) {
  //     setLoading(true);
  //     try {
  //       await axios.post(`${API}/accounts/password_reset/`, formData);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   async function ressetPassConfirm(formData) {
  //     setLoading(true);
  //     try {
  //       await axios.post(`${API}/accounts/password_reset/confirm/`, formData);
  //     } catch (error) {
  //       console.log(error);
  //       setErrorResset(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  function logout() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser("");
    navigate("/login");
  }

  async function checkAuth() {
    setLoading(true);
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));

      const res = await axios.post(`${API}/users/confirm/`, {
        refresh: tokens.refresh,
      });
      localStorage.setItem("tokens", JSON.stringify(res.data));
      const email = localStorage.getItem("email");
      setCurrentUser(email);
    } catch (error) {
      console.log(error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  async function getUser() {
    try {
      const res = await axios(`http://localhost:8080/users`);

      res.data.map((user) => {
        if (user.email === currentUser) {
          dispatch({ type: "GET_USER", payload: user });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   async function userFavorites(id) {
  //     try {
  //       const res = await axios(`${API}/accounts/${id}/favorites/`);
  //       dispatch({ type: "GET_USER_FAVORITES", payload: res.data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async function changeUser(id, formData) {
    try {
      await axios.patch(`${API}/accounts/${id}/`, formData, getTokens());
      getUser();
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  firebase.initializeApp({
    apiKey: "AIzaSyCb-IWnaGVToMubd49hkcXypJ2JITqTIog",
    authDomain: "chat-car-7a515.firebaseapp.com",
    projectId: "chat-car-7a515",
    storageBucket: "chat-car-7a515.firebasestorage.app",
    messagingSenderId: "301788245325",
    appId: "1:301788245325:web:ba8461f9cae6285eda5b04",
    measurementId: "G-4RZRNQ8TR8",
  });

  const firestore = firebase.firestore();

  const values = {
    changeUser,
    getUser,
    decodeToken,
    userId,
    users: state.users,
    favorites: state.favorites,

    handleRegister,
    handleLogin,
    currentUser,
    logout,
    checkAuth,
    loading,
    error,
    firebase,
    firestore,
    errorResset,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
