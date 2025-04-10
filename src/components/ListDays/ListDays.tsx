import { FC } from 'react';
import { weekday } from '../../data/data';
import styles from './ListDays.module.scss';
const ListDays: FC<{ currentDate: Date }> = ({
  currentDate,
}: {
  currentDate: Date;
}) => {
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
  return (
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
      <div className={styles.footer}>
        <button className={styles.btnConfirm}>Подтвердить</button>
        <button className={styles.btnCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default ListDays;
