import React, { useState, useEffect }  from 'react';

import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/icons/off.svg';

import api from '../../services/api';

import './styles.css'

function Landing() {
    // poderiamos setar o valor para o presente no server, mas como
    // leva um tempo para acessa-lo e obte-lo, passmos um valor
    // padrão, nesta caso, 0.
    const [totalConnections, setTotalConnections] = useState(0);

    // esta função recebe dois parametros: uma função e um array
    // variaveis. A função passada como parametro será executado somente
    // quando a variavel dentro do array mudar. Caso o array esteja
    // vazio, a função será executada apenas quando o componente
    // é exibido em tela.
    useEffect(() => {
        // passmos a rota pois a base url ja foi configurada.
      api.get('connections').then(response => {
          // usando desestruturação para a propriedade 'total'
          const { total } = response.data

          setTotalConnections(total)
      })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">

                <div className="page-landing-hero">
                    <div className="profile-menu-container">
                        <img src="https://www.famousbirthdays.com/headshots/angelskimi-1.jpg" alt="Proffy" />
                        <h2>Angels Kimi</h2>
                        <LogoutIcon/>
                    </div>

                    <div className="page-landing-hero-inner">
                        <div className="logo-container">
                            <img src={logoImg} alt="Proffy" />
                            <h2>sua plataforma de estudos online.</h2>
                        </div>

                        <img
                            src={landingImg}
                            alt="Plataforma de estudos"
                            className="hero-image"
                        />
                    </div>

                </div>

                <div className="welcome-container">
                    <h2>
                        Seja bem-vindo.<br />
                        <p>O que deseja fazer?</p>
                    </h2>

                    <div className="buttons-container">
                        <Link to="/study" className="study">
                            <img src={studyIcon} alt="Estudar" />
                            Estudar
                        </Link>

                        <Link to="/give-classes" className="give-classes">
                            <img src={giveClassesIcon} alt="Dar aulas" />
                            Dar aulas
                        </Link>
                    </div>

                    <span className="total-connections">
                        Total de { totalConnections } conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Landing;