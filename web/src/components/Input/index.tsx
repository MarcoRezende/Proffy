import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

// usando desestruturação para obter a label diretamente.
// "...rest" Obtém todas as propriedades de um input e as passa
// para o elemento indicado.
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
        <label htmlFor={name}>{label}</label>
        <input type="text" id={name} {...rest}/>
    </div>
  );
}

export default Input;