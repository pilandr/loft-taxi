import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import RegisterInput from '../../Register/RegisterForm/RegisterInput/RegisterInput';
import style from '../../Register/RegisterForm/RegisterForm.module.css';

export const LoginForm = (props) => {

  const onSubmit = (values, functions) => {
    const { email, password } = values;
    props.authenticate(email, password);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Заполните email ';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Некорректный email';
    }

    if (!values.password) {
      errors.password = 'Заполните пароль ';
    }
    return errors;
  };

  return <>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>Войти</div>
          <Field name="email" nameReg="email" typeReg="email" placeholder="mail@mail.ru" label="Email" component={RegisterInput} />
          <Field 
            name="password" 
            nameReg="password" 
            typeReg="password" 
            placeholder="*************" 
            label="Пароль" 
            component={RegisterInput} 
          />
          <input className={style.submit} type="submit" value="Войти" />
        </form>
      )}
    />
    <div className={style.new}>Новый пользователь? <Link to="/register" className="login__new-btn">Регистрация</Link></div>
  </>;
};




