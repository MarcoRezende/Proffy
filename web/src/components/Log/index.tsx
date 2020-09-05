import React, { useState, FormEvent } from 'react';

import backIcon from '../../assets/images/icons/back.svg';
import logoIcon from '../../assets/images/logo.svg';

import api from '../../services/api'

import './styles.css';

interface LogProps {
  title: string;
  paragraphs: Array<string>;
  btnText: string;
  sendStatus?: boolean;
  handleSubmit: Function;
}

const Log: React.FC<LogProps> = (props) => {
  function externalSubmit(e: FormEvent) {
    e.preventDefault();

    props.handleSubmit()
  }

  return (
    <div id="log-page" className="container">
      <main className="log-inner">
        <div className="wrapper">
          <a href="/"><img src={backIcon} alt="Voltar" /></a>
          <form className="log-form" onSubmit={externalSubmit}>
            <div className="fieldset">
              <legend>
                <h2>{props.title}</h2>
                {props.paragraphs.map((paragraph, index: number) => {
                  return <p key={`paragraph-${index}`}>{paragraph}</p>;
                })}
              </legend>
              {props.children}
            </div>
            <button
              type="submit"
              className={ props.sendStatus ? '' : 'disabled' }
            >
              {props.btnText}
            </button>
          </form>
        </div>
        <div className="log-hero">
          <div>
            <img src={logoIcon} alt="Proffy" />
            <p>Sua plataforma de <br /> estudos online.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Log;