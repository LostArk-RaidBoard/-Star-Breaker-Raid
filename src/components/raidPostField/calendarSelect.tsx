import { ko } from 'date-fns/locale/ko'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './calendar.module.css'
import { useRaidSelect } from '@/store/raidSelectStore'
import { setHours, setMinutes, nextDay, startOfWeek, isWednesday, subDays, addDays } from 'date-fns'

export default function CalendarSelect() {
  const { raidDate, setRaidDate } = useRaidSelect()
  const today = new Date()
  const todayDay = today.getDay()

  // 수요일 날짜 계산
  const lastWednesday =
    todayDay >= 3
      ? startOfWeek(today, { weekStartsOn: 0 }) // 이번주 수요일
      : subDays(startOfWeek(today, { weekStartsOn: 1 }), 7) // 저번주 수요일

  const thisWednesday = nextDay(lastWednesday, 3) // 이번주 수요일
  const nextWednesday = addDays(thisWednesday, 7) // 다음주 수요일

  // 선택 가능한 날짜 범위 설정
  let minDate = thisWednesday // 기본값 설정
  let maxDate = nextWednesday // 기본값 설정

  let minTime = setHours(setMinutes(thisWednesday, 0), 0) // 기본 minTime
  let maxTime = setHours(setMinutes(nextWednesday, 59), 23) // 기본 maxTime

  return (
    <div className='flex w-full flex-col'>
      <label htmlFor='raidDate' className='text-lg'>
        • 날짜 선정
      </label>
      <div className='mt-1 h-full w-full'>
        <DatePicker
          id='raidDate'
          selected={raidDate}
          onChange={(date) => {
            if (date) {
              setRaidDate(date)
            }
          }}
          locale={ko}
          minDate={minDate}
          maxDate={maxDate}
          minTime={minTime}
          maxTime={maxTime}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={15}
          timeCaption='time'
          dateFormat='EEEE, HH시 mm분 yyyy. MM.dd'
          className={styles.datePicker}
          wrapperClassName={styles.datePickerWrapper}
        />
      </div>
    </div>
  )
}
