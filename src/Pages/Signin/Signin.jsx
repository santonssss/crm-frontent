import React from "react";

const Signin = () => {
  return (
    <form className="signin-wrap">
      <span>Авторизация</span>
      <div className="sign-inp">
        <input type="text" placeholder="Логин" />
      </div>
      <div className="sign-inp">
        <input type="password" placeholder="Пароль" />
      </div>
      <button>Зарегистрироваться</button>
    </form>
  );
};

export default Signin;
