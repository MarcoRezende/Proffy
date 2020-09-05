import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import {ReactComponent as BackIcon} from '../../assets/images/icons/back.svg';

import api from '../../services/api'

import createSchedule, { scheduleInt } from '../../utils/createSchedule'

import './styles.css';

interface Schedule {

}

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    subject: string;
    bio: string;
    cost: number;
    whatsapp: string;
    schedule: Array<scheduleInt>;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
            <header>
              <img src={teacher.avatar} alt="Professor"/>
              <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
              </div>
            </header>
            <p>{teacher.bio}</p>

            <ul className="teacher-schedule">
              <span><p>Dia</p><p></p><p>Horário</p></span>
              {createSchedule(teacher.schedule).map(day => {
                return(
                  <li key={`day-${day.week_day}`} className={!day.to ? "disabled" : ""}>
                    <p className="schedule-label">Dia</p>
                    <p className="schedule-value">{day.label}</p>
                    <span><BackIcon/></span>
                    <p className="schedule-label">Horário</p>
                    <p className="schedule-value">
                    {
                      day.to ?
                      `${day.from} - ${day.to}` :
                      "-"
                    }
                    </p>
                  </li>
                )
              })}
            </ul>

            <footer>
              <p>Preço/Hora<strong>R$ {teacher.cost},00</strong></p>
              <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/${teacher.whatsapp}`} onClick={createNewConnection}>
                <img src={whatsappIcon} alt="Whatsapp"/>Entrar em Contato
              </a>
            </footer>
        </article>
    )
}

export default TeacherItem;