import React from 'react';
import style from './InputCard.module.css';

const InputCard = ({ input, meta, label, id, classNameInput }) => {
  
  return (
    <>
      <label className={style.lbl} htmlFor={input.name}>{label}</label>
      <input {...input} className={`${style.input} ${classNameInput}`} id={id} />
      {meta.error && meta.visited && !meta.active && (
        <pre className={style.preClass}>{meta.error}</pre>
      )}
    </>
  );
};

export default InputCard;