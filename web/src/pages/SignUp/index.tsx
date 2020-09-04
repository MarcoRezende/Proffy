import React, { useState, FormEvent } from 'react';

import backIcon from '../../assets/images/icons/back.svg';
import logoIcon from '../../assets/images/logo.svg';
import { ReactComponent as EyeVisibleIcon } from '../../assets/images/icons/visibility.svg';
import { ReactComponent as EyeInvisibleIcon } from '../../assets/images/icons/invisible.svg';

import api from '../../services/api'

import './styles.css';

function TeacherList() {
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(false);

  function handlerTogglePasswordVisibility() {
    setTogglePasswordVisibility(!togglePasswordVisibility);
  }

  return (
    <div id="sign-up-page" className="container">
      <main className="sign-up-inner">
        <div className="wrapper">
          <a href="/"><img src={backIcon} /></a>
          <form className="sign-up-form">
            <div className="fieldset">
              <legend>
                <p>Cadastro</p>
                <p>Preencha os dados abaixo para <br/> começar.</p>
              </legend>

              <div className="sign-up-input-block">
                <input type="text" placeholder="Nome" name="name" />
                <input type="text" placeholder="Sobrenome" name="last-name" />
                <input type="email" placeholder="E-mail" name="email" />
                <span className="password-input">
                  <input
                    type={ togglePasswordVisibility ? 'text' : 'password' }
                    placeholder="Senha"
                    name="password"
                  />
                  <span className="input-icon" onClick={handlerTogglePasswordVisibility}>
                    { togglePasswordVisibility ? <EyeInvisibleIcon/> : <EyeVisibleIcon/> }
                  </span>
                </span>
              </div>
            </div>
            <button type="submit">Concluir cadastro</button>
          </form>
        </div>
        <div className="sign-up-hero">
          <div>
            <img src={logoIcon} />
            <p>Sua plataforma de <br /> estudos online.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherList;