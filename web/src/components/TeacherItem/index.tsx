import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://vignette.wikia.nocookie.net/tictactoe2/images/d/d1/Ginavalentina_2015_f_ginavalentina.jpg/revision/latest/top-crop/width/360/height/450?cb=20190606212317&path-prefix=de" alt="Professor"/>
                <div>
                    <strong>Jessica Almeida</strong>
                    <span>Ciência</span>
                </div>
            </header>

            <p>
            Entusiasta das melhores tecnologias de ciência avançada.

            <br /><br />

            Apoixonada por fazer novas descobertas e por mudar a vida das pessoas através de experiências
            </p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em Contato
                </button>
            </footer>
        </article>

        )
}

export default TeacherItem;