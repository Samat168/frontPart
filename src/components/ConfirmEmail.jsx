import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmEmail = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Подтвердите вашу почту</h2>
      <p>Мы отправили письмо с подтверждением на адрес: {email}</p>
    </div>
  );
};

export default ConfirmEmail;
