import React, { useState } from 'react';

import Log from '../../components/Log'

import api from '../../services/api'

import './styles.css';

function ForgotPassword() {
  const [sendStatus, setSendStatus] = useState(false)

  function handleSendStatus(e: string) {
    e.length ? setSendStatus(true) : setSendStatus(false);
  }

  function handleSubmit() {
    console.log(sendStatus)
  }

  return (
    <Log
      handleSubmit={handleSubmit}
      title="Eita, esqueceu sua senha?"
      paragraphs={["Não esquenta, vamos dar um jeito nisso"]}
      btnText="Enviar"
      sendStatus={sendStatus}
    >
      <div className="forgot-password-input-block">
        <input type="email" placeholder="E-mail" name="email" onChange={(e) => { handleSendStatus(e.target.value) }}/>
      </div>
    </Log>
  )
}

export default ForgotPassword;