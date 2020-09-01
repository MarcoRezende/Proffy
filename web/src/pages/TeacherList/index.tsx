import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader/';
import TeacherItem, { Teacher } from '../../components/TeacherItem/';
import Input from '../../components/Input/';
import Select from '../../components/Select/';

import smileFaceIcon from '../../assets/images/icons/smile.svg';
import {ReactComponent as BackIcon} from '../../assets/images/icons/back.svg';

import api from '../../services/api'

import createSchedule from '../../utils/createSchedule'

import './styles.css';

interface MyObjLayout {
    value: string;
    label: string;
}

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const headerMessage = {
      text: ["Nós temos 32", "professores."],
      img: smileFaceIcon
    }

    const test: Array<{id: number, week_day: number, from: number, to: number, class_id: number}> = [
      {
        "id": 1,
        "week_day": 1,
        "from": 480,
        "to": 720,
        "class_id": 1
      },
      {
        "id": 2,
        "week_day": 3,
        "from": 600,
        "to": 1080,
        "class_id": 1
      },
      {
        "id": 3,
        "week_day": 4,
        "from": 480,
        "to": 720,
        "class_id": 1
      }
    ]

    async function searchTeachers(e: FormEvent) {
      e.preventDefault();

      const response = await api.get('/classes', {
        params: {
          subject,
          week_day,
          time
        }
      });

      console.log(response.data)
      createSchedule(response.data[0].schedule)
      setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
           <PageHeader
             title="Estes são os Proffys disponíveis."
             section="Estudar"
             extra={headerMessage}
           >
               <form id="search-teachers" onSubmit={searchTeachers}>
                  <Select
                    name="subject"
                    label="Matéria"
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value) }}
                    options={[
                      { value: "Artes", label: "Artes" },
                      { value: "Biologia", label: "Biologia" },
                      { value: "Ciências", label: "Ciências" },
                      { value: "Educação Física", label: "Educação Física" },
                      { value: "Geográfia", label: "Geográfia" },
                      { value: "História", label: "História" },
                      { value: "Matemática", label: "Matemática" },
                      { value: "Sociologia", label: "Sociologia" },
                      { value: "Química", label: "Química" },
                      { value: "Filosofia", label: "Filosofia" },
                      { value: "Português", label: "Português" }
                    ]}
                  />
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={week_day}
                    onChange={(e) => { setWeekDay(e.target.value) }}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-Feira' },
                      { value: '2', label: 'Terça-Feira' },
                      { value: '3', label: 'Quarta-Feira' },
                      { value: '4', label: 'Quinta-Feira' },
                      { value: '5', label: 'Sexta-Feira' },
                      { value: '6', label: 'Sábado' },
                    ]

                    }
                  />
                  <Input
                    name="time"
                    label="Hora"
                    value={time}
                    onChange={(e) => { setTime(e.target.value) }}
                  />

                  <button type="submit">Buscar</button>
               </form>
           </PageHeader>

           <main>
              <article className="teacher-item">
                <header>
                  <img src="https://celebswiki.info/wp-content/uploads/2020/04/Kendra-Lust-Biography-Net-Worth-Height-Weight-Age-Size-Awards-512x460.jpg" alt="Professor"/>
                  <div>
                    <strong>Fernanda Vasconcelos</strong>
                    <span>Química</span>
                  </div>
                </header>
                <p>Apoixonada em experimentar e manipular todos os tipos de formas que o mundo tem a oferecer.</p>

                <ul className="teacher-schedule">
                  <span><p>Dia</p><p></p><p>Horário</p></span>
                  {createSchedule(test).map((day, index) => {
                    return(
                      <li key={`day-${day.value}`} className={!day.to ? "disabled" : ""}>
                        <p className="schedule-label">Dia</p>
                        <p className="schedule-value">{day.label}</p>
                        <span><BackIcon/></span>
                        <p className="schedule-label">Horário</p>
                        <p className="schedule-value">
                        {
                          day.to ?
                          `${day.to} - ${day.from}` :
                          "-"
                        }
                        </p>
                      </li>
                    )
                  })}
                </ul>

                <footer>
                  <p>Preço/Hora<strong>R$ 50,00</strong></p>
                  <a target="_blank" rel="noopener noreferrer" href="https://wa.me/818643887">
                    <img src="/static/media/whatsapp.45c6e6ec.svg" alt="Whatsapp"/>Entrar em Contato
                  </a>
                </footer>
              </article>
              {teachers.map((teacher: Teacher) => {
                return (
                  <TeacherItem key={teacher.id} teacher={teacher} />
                )
              })}
           </main>
        </div>
    )
}

export default TeacherList;