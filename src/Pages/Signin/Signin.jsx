import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://monkfish-app-v8pst.ondigitalocean.app/api/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/login");
    } catch (error) {
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
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="sign-inp">
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="sign-inp">
        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <Link className="link" to={"/login"}>
        Есть аккаунт?
      </Link>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default Signin;
