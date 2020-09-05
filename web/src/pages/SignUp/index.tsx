import React, { useState } from 'react';

import Log from '../../components/Log'

import { ReactComponent as EyeVisibleIcon } from '../../assets/images/icons/visibility.svg';
import { ReactComponent as EyeInvisibleIcon } from '../../assets/images/icons/invisible.svg';

import api from '../../services/api'

import './styles.css';

function SignUp() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);
  const [sendStatus, setSendStatus] = useState(false)

  function handleSendStatus() {
    name.length &&
    lastName.length &&
    email.length &&
    password.length
    ? setSendStatus(true) : setSendStatus(false);
  }

  function handlerTogglePasswordVisibility() {
    setTogglePasswordVisibility(!togglePasswordVisibility);
  }

  function handleSubmit() {

  }

  return (
    <Log
      handleSubmit={handleSubmit}
      title="Cadastro"
      paragraphs={["Preencha os dados abaixo para", "começar."]}
      btnText="Concluir cadastro"
      sendStatus={sendStatus}
    >
      <div className="sign-up-input-block">
        <input type="text"
          placeholder="Nome"
          name="name"
          onChange={(e) => { setName(e.target.value); handleSendStatus() }}
        />
        <input type="text"
          placeholder="Sobrenome"
          name="last-name"
          onChange={(e) => { setLastName(e.target.value); handleSendStatus() }}
        />
        <input type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => { setEmail(e.target.value); handleSendStatus() }}
        />
        <span className="password-input">
          <input
            type={ togglePasswordVisibility ? 'text' : 'password' }
            placeholder="Senha"
            name="password"
            onChange={(e) => { setPassword(e.target.value); handleSendStatus() }}
          />
          <span className="input-icon" onClick={handlerTogglePasswordVisibility}>
            { togglePasswordVisibility ? <EyeInvisibleIcon/> : <EyeVisibleIcon/> }
          </span>
        </span>
      </div>
    </Log>
  )
}

export default SignUp;