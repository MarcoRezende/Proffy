import timeConvert from '../utils/timeConverter'

export interface scheduleInt {
    id: number,
    week_day: number,
    from: number,
    to: number,
    class_id: number
}

export default function createSchedule(schedule: Array<scheduleInt>) {
    const newTeacherSchedule: Array<{week_day: number, to: string, from: string, label: string}> = [
      { week_day: 0, to: '', from: '', label: 'Domingo' },
      { week_day: 1, to: '', from: '', label: 'Segunda' },
      { week_day: 2, to: '', from: '', label: 'Terça' },
      { week_day: 3, to: '', from: '', label: 'Quarta' },
      { week_day: 4, to: '', from: '', label: 'Quinta' },
      { week_day: 5, to: '', from: '', label: 'Sexta' },
      { week_day: 6, to: '', from: '', label: 'Sábado' }
    ]

    for (let i = 0; i < schedule.length; i++) {
      for (let ind = 0; ind < newTeacherSchedule.length; ind++) {
        if (schedule[i].week_day === newTeacherSchedule[ind].week_day) {
          newTeacherSchedule[ind] = {
            week_day: schedule[i].week_day,
            from: timeConvert(schedule[i].from),
            to: timeConvert(schedule[i].to),
            label: newTeacherSchedule[ind].label
          };
        }
      }
    }

    console.log(timeConvert(schedule[0].from))
    return newTeacherSchedule;
}