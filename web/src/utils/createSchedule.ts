interface scheduleInt {
    id: number,
    week_day: number,
    from: number,
    to: number,
    class_id: number
}

export default function createSchedule(schedule: Array<scheduleInt>) {
    const week: Array<{value: string, label: string}> = [
      { value: '0', label: 'Domingo' },
      { value: '1', label: 'Segunda' },
      { value: '2', label: 'Terça' },
      { value: '3', label: 'Quarta' },
      { value: '4', label: 'Quinta' },
      { value: '5', label: 'Sexta' },
      { value: '6', label: 'Sábado' },
    ]


    const test: Array<{value: string, to: string, from: string}> = [
      { value: '1', to: '08h', from: '16h' },
      { value: '3', to: '08h', from: '16h' },
      { value: '4', to: '08h', from: '16h' }
    ]

    const teacherSchedule: Array<{value: string, to: string, from: string, label: string}> = [
      { value: '0', to: '', from: '', label: 'Domingo' },
      { value: '1', to: '', from: '', label: 'Segunda' },
      { value: '2', to: '', from: '', label: 'Terça' },
      { value: '3', to: '', from: '', label: 'Quarta' },
      { value: '4', to: '', from: '', label: 'Quinta' },
      { value: '5', to: '', from: '', label: 'Sexta' },
      { value: '6', to: '', from: '', label: 'Sábado' }
    ]

    for (let i = 0; i < schedule.length; i++) {
      for (let ind = 0; ind < teacherSchedule.length; ind++) {
        if (String(schedule[i].week_day) === teacherSchedule[ind].value) {
          teacherSchedule[ind] = {
            value: String(schedule[i].week_day),
            from: String(schedule[i].from),
            to: String(schedule[i].to),
            label: teacherSchedule[ind].label
          };
        }
      }
    }

    console.log(teacherSchedule)
    return teacherSchedule;
}