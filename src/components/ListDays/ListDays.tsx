import { Dispatch, FC, SetStateAction } from 'react';
import { weekday } from '../../data/data';
import styles from './ListDays.module.scss';
type Props = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setInputDate: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  inputText: string;
  setErrorInputText: Dispatch<SetStateAction<boolean>>;
};
const ListDays: FC<Props> = ({
  currentDate,
  setCurrentDate,
  setInputText,
  setInputDate,
  setModal,
  inputText,
  setErrorInputText,
}: Props) => {
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
  const selectDay = (e: any): void => {
    setCurrentDate(
      (prevDate) =>
        new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          Number(e.target.textContent)
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
    setErrorInputText(false);
  };

  const handleBtnCancelled = (): void => {
    setModal(false);
    if (!inputText) {
      setErrorInputText(true);
    }
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
