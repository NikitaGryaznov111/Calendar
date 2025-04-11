import { FC, useRef, useState } from 'react';
import { namesMonth } from '../../data/data';
import ListMonths from '../ListMonths/ListMonths';
import ListDays from '../ListDays/ListDays';
import ListYears from '../ListYears/ListYears';
import styles from './ModalCalendar.module.scss';

const ModalCalendar: FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<boolean>(false);
  const ref = useRef(null);
  const currentMonthName = namesMonth[currentDate.getMonth()];
  const fullYear = currentDate.getFullYear();
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

  const selectMonth = (): void => {
    setCurrentMonth(true);
    setCurrentYear(false);
  };
  const selectYear = () => {
    setCurrentYear(true);
    (ref.current as unknown as HTMLDivElement).className = styles.monthInactive;

    setCurrentMonth(false);
  };
  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div
          ref={ref}
          className={currentMonth ? styles.monthActive : styles.month}
        >
          <button onClick={prevMonth} className={styles.btnPrevMonth}></button>
          <span onClick={selectMonth} className={styles.currentMonthName}>
            {currentMonthName}
          </span>
          <button onClick={nextMonth} className={styles.btnNextMonth}></button>
        </div>
        <div className={currentYear ? styles.yearActive : styles.year}>
          <button onClick={prevYear} className={styles.btnPrevYear}></button>
          <span onClick={selectYear} className={styles.currentYear}>
            {fullYear}
          </span>
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
        <>
          {currentYear ? (
            <ListYears
              setCurrentDate={setCurrentDate}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
            />
          ) : (
            <ListDays currentDate={currentDate} />
          )}
        </>
      )}
    </div>
  );
};

export default ModalCalendar;
