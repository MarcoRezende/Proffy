import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader/'
import Input from '../../components/Input/';
import Textarea from '../../components/Textarea/';
import Select from '../../components/Select/';

import api from '../../services/api'

import warningIcon from '../../assets/images/icons/warning.svg'
import rocketIcon from '../../assets/images/icons/rocket.svg'

import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    // 'useState' retorna um array com dois valores: o valor setado e
    // uma função que modifica esse valor, pois não podemos modificar
    // uma variavel diretamente com react se queremos mudar o estado da mesma.
    // Estamos usando desestruturação.
    const [scheduleItems, setScheduleItems] = useState([
          { week_day: 0, from: '', to: '' }
        ])

    const headerMessage = {
      text: ["Prepara-se!", "Vai ser o máximo"],
      img: rocketIcon
    }

    function addNewScheduleItem() {
      // para modificar e incluir, primeiro passamos os items do nosso array
      // original, e depois adicionamos outro item. A forma mais facil
      // de fazer isso é usando o 'spread operator'
      setScheduleItems([
        ...scheduleItems,
        { week_day: 0, from: '', to: '' }
      ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
        // usamos o index para modificar apenas um determinado item, isto é
        // esse index, idenficação, serve como relacionamento/ligação entre eles.
        if (index === position) {
          // retornamos um objeto, mas modificamos apenas o campo
          // 'field', que, neste caso, recebe o nome 'week_day'
          // e seu valor é uma "string numerica".
          return { ...scheduleItem, [field]: value }
        }

        // caso os items não sejam "os mesmos", apenas o retornamos.
        return scheduleItem;
      });

      setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
      e.preventDefault();

      api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
      }).then(() => {
        alert('Cadastro realziado com sucesso!')

        history.push('/')
      }).catch(() => {
        alert('Erro no cadastro')
      })
    }

    return (
        <div id="page-teacher-form" className="container">
          <PageHeader
            title="Que incrível que você quer dar auals."
            description="O primeiro passo é preencher esse formulário de inscrição."
            section="Dar Aulas"
            extra={headerMessage}
          />

          <main>
            <form onSubmit={handleCreateClass}>
              <div className="fieldset">
                  <legend>Seus Dados</legend>

                  <div className="user-info">
                    <img className="avatar" src="https://www.famousbirthdays.com/headshots/angelskimi-1.jpg"/>

                    <div className="name-and-subject">
                      <span id="name">Angels Kimi</span>
                      <span id="subject">Geográfia</span>
                    </div>

                  </div>

                  <Input
                    name="whatsapp"
                    label="WhatsApp"
                    value={whatsapp}
                    onChange={(e) => { setWhatsapp(e.target.value) }}
                  />

                  <Textarea
                    name="bio"
                    label="Biografia"
                    value={bio}
                    onChange={(e) => { setBio(e.target.value) }}
                  />
              </div>

              <div className="fieldset">
                  <legend>Sobre a Aula</legend>

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
                  <Input
                    name="cost"
                    label="Custo da sua aula por hora"
                    value={cost}
                    onChange={(e) => { setCost(e.target.value) }}
                  />
              </div>

              <div className="fieldset">
                  <legend>
                    Horários Disponíveis
                    <button type="button" onClick={addNewScheduleItem}>
                      + Novo Horário
                    </button>
                  </legend>

                  {scheduleItems.map((scheduleItem, index) => {
                    return (
                      <div key={index} className="schedule-item">
                        <Select
                          name="week_day"
                          label="Dia da Semana"
                          value={scheduleItem.week_day}
                          onChange={(e) => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                          options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-Feira' },
                            { value: '2', label: 'Terça-Feira' },
                            { value: '3', label: 'Quarta-Feira' },
                            { value: '4', label: 'Quinta-Feira' },
                            { value: '5', label: 'Sexta-Feira' },
                            { value: '6', label: 'Sábado' },
                          ]}
                        />
                        <Input
                          name="from"
                          label="Das"
                          type="time"
                          value={scheduleItem.from}
                          onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }}
                        />
                        <Input
                          name="to"
                          label="Até"
                          type="time"
                          value={scheduleItem.to}
                          onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value) }}
                        />
                      </div>
                    )
                  })}

              </div>

              <footer>
                <p>
                  <img src={warningIcon} alt="aviso importante"/>
                  Importante! <br />
                  Preencha todos os dados
                </p>
                <button type="submit">Salvar Cadastro</button>
              </footer>
            </form>
          </main>
        </div>
    )
}

export default TeacherForm;