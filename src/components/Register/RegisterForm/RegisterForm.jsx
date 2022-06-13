import React from 'react';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import RegisterInput from './RegisterInput/RegisterInput';
import style from './RegisterForm.module.css'; 

export const RegisterForm = (props) => {

  const onSubmit = (values, functions) => {
    const { email, password, username } = values;
    props.register(email, password, username);
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

    if (!values.username) {
      errors.username = 'Заполните имя ';
    }
    return errors;
  };

  return <>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid }) => (
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>Регистрация</div>
          <Field name="email" nameReg="email" typeReg="email" placeholder="mail@mail.ru" component={RegisterInput} label="Email*" />
          <Field 
            name="username" 
            nameReg="username" 
            typeReg="text" 
            placeholder="Петр Александрович" 
            component={RegisterInput} 
            label="Как вас зовут?*" 
          />
          <Field 
            name="password" 
            nameReg="password" 
            typeReg="password" 
            placeholder="*************" 
            component={RegisterInput} 
            label="Придумайте пароль*" 
          />
          <input className={style.submit} type="submit" value="Зарегистрироваться" />
        </form>
      )}
    />
    <div className={style.new}>Уже зарегистрированы? <Link to="/" className={style.newBtn}>Войти</Link></div>
  </>;
}; 