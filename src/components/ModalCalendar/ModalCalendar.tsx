import { FC, useState } from 'react';
import { namesMonth } from '../../data/data';
import styles from './ModalCalendar.module.scss';
import ListMonths from '../ListMonths/ListMonths';
import ListDays from '../ListDays/ListDays';
const ModalCalendar: FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<boolean>(false);
  const currentMonthName = namesMonth[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
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

  const selectMonth = () => {
    setCurrentMonth(true);
  };
  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={currentMonth ? styles.monthActive : styles.month}>
          <button onClick={prevMonth} className={styles.btnPrevMonth}></button>
          <span onClick={selectMonth} className={styles.currentMonthName}>
            {currentMonthName}
          </span>
          <button onClick={nextMonth} className={styles.btnNextMonth}></button>
        </div>
        <div className={styles.year}>
          <button onClick={prevYear} className={styles.btnPrevYear}></button>
          {currentYear}
          <button onClick={nextYear} className={styles.btnNextYear}></button>
        </div>
        {/* <div className={styles.time}></div> */}
      </div>
      {currentMonth ? (
        <ListMonths
          setCurrentDate={setCurrentDate}
          setCurrentMonth={setCurrentMonth}
        />
      ) : (
        <ListDays currentDate={currentDate} />
      )}
    </div>
  );
};

export default ModalCalendar;
