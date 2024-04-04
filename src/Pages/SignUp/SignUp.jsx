import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://monkfish-app-v8pst.ondigitalocean.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      localStorage.setItem("username", data.data.user.username);
      localStorage.setItem("phone", data.data.user.phone);
      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("role", data.data.user.role);
      localStorage.setItem("idOptom", data.data.user.id);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      setError(error.message);
    }
  };

  return (
    <form className="signin-wrap" onSubmit={handleSubmit}>
      <span>Авторизация</span>
      <div className="sign-inp">
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(null);
          }}
        />
      </div>
      <div className="sign-inp">
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setError(null);
            setPassword(e.target.value);
          }}
        />
      </div>
      {error !== null ? (
        <span style={{ color: "red" }}>
          Логин или пароль введены неправильно
        </span>
      ) : null}
      <button type="submit">Войти</button>
    </form>
  );
};

export default SignUp;
