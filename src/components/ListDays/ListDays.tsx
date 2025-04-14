import { FC } from 'react';
import { weekday } from '../../data/data';
import { TPropsDays } from '../../types/types';
import styles from './ListDays.module.scss';

const ListDays: FC<TPropsDays> = ({
  currentDate,
  setCurrentDate,
  setInputText,
  setInputDate,
  setModal,
  inputText,
  setErrorInput,
}: TPropsDays) => {
  const currentDay: number = currentDate.getDate();
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
  const selectDay = (e: React.MouseEvent<HTMLLIElement>): void => {
    const li = e.target as HTMLLIElement;

    setCurrentDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          Number(li.textContent)
        )
    );
  };

  const handleBtnConfirm = (): void => {
    const year = String(currentDate.getFullYear());
    let month = String(currentDate.getMonth() + 1);
    let day = String(currentDate.getDate());
    if (+day < 10) {
      day = '0' + day;
    }
    if (+month < 10) {
      month = '0' + month;
    }
    const fullDateInputDate = year + '-' + month + '-' + day;
    const fullDateInputText = day + '.' + month + '.' + year;
    setInputText(fullDateInputText);
    setInputDate(fullDateInputDate);
    setModal(false);
    setErrorInput(false);
  };

  const handleBtnCancelled = (): void => {
    setModal(false);

    setErrorInput(true);
  };
  return (
    <div>
      <ul className={styles.weekday}>
        {weekday.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
      <ul className={styles.daysMonth}>
        {daysOfMonth.map((day, index) => (
          <li
            onClick={selectDay}
            className={`${styles.dayMonth} ${
              currentDay === day ? styles.active : null
            }`}
            key={index}
          >
            {day}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <button onClick={handleBtnConfirm} className={styles.btnConfirm}>
          Подтвердить
        </button>
        <button onClick={handleBtnCancelled} className={styles.btnCancel}>
          Отменить
        </button>
      </div>
    </div>
  );
};

export default ListDays;
