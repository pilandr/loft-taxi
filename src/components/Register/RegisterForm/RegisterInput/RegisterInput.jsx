import React from 'react';
import style from './RegisterInput.module.css';

const RegisterInput = ({ input, meta, label, nameReg, typeReg, placeholder }) => {
  return (
    <>
      <label className={style.lbl} htmlFor={nameReg}>{label}</label>
      <input 
        {...input} 
        className={`${style.input} ${style.inputRegister}`} 
        id={nameReg} 
        type={typeReg} 
        name={nameReg} 
        placeholder={placeholder} 
        size="28" 
      />
      {meta.error && meta.visited && !meta.active && (
        <pre className={style.inputError}>{meta.error}</pre>
      )}
    </>
  );
};

export default RegisterInput;