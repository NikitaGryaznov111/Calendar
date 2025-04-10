import { FC, useState } from 'react';
import styles from './ModalCalendar.module.scss';
const ModalCalendar: FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekday: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const nameMonth: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const currentMonthName = nameMonth[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const getDaysOfMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days: (number | null)[] = [];
    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }
    return days;
  };
  const daysOfMonth = getDaysOfMonth(currentDate);

  const prevMonth = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };
  const nextMonth = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };
  const prevYear = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1)
    );
  };
  const nextYear = (): void => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1)
    );
  };
  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.month}>
          <button onClick={prevMonth} className={styles.btnPrevMonth}></button>
          {currentMonthName}
          <button onClick={nextMonth} className={styles.btnNextMonth}></button>
        </div>
        <div className={styles.year}>
          <button onClick={prevYear} className={styles.btnPrevYear}></button>
          {currentYear}
          <button onClick={nextYear} className={styles.btnNextYear}></button>
        </div>
        {/* <div className={styles.time}></div> */}
      </div>

      <div>
        <ul className={styles.weekday}>
          {weekday.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
        <ul className={styles.daysMonth}>
          {daysOfMonth.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>

      <div className={styles.footer}>
        <button className={styles.btnConfirm}>Подтвердить</button>
        <button className={styles.btnCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default ModalCalendar;
