import { FC, useRef } from 'react';
import { namesMonth } from '../../data/data';
import { TPropsMonth } from '../../types/types';
import styles from './ListMonths.module.scss';

const ListMonths: FC<TPropsMonth> = ({
  setCurrentDate,
  setCurrentMonth,
  setModal,
  currentDate,
  inputText,
  setErrorInput,
}: TPropsMonth) => {
  const currentMonthName = namesMonth[currentDate.getMonth()];

  const ref = useRef<HTMLLIElement>(null);
  const selectNameMonth = (e: React.MouseEvent<HTMLLIElement>): void => {
    ref.current = e.target as HTMLLIElement;
    const nameSelectMonth = ref.current.textContent;
    const month = namesMonth.indexOf(nameSelectMonth as string);
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
  };
  const handleBtnConfirm = (): void => {
    setCurrentMonth(false);
  };
  const handleBtnCancelled = (): void => {
    setModal(false);
    if (!inputText) {
      setErrorInput(true);
    }
  };
  return (
    <div>
      <ul className={styles.listMonth}>
        {namesMonth.map((month, index) => {
          return (
            <li
              onClick={selectNameMonth}
              className={`${styles.monthName} ${
                currentMonthName === month ? styles.active : null
              }`}
              key={index}
              tabIndex={1}
            >
              {month}
            </li>
          );
        })}
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

export default ListMonths;
