import { FC, useEffect, useState } from 'react';
import { TPropsYears } from '../../types/types';
import styles from './ListYears.module.scss';

const ListYears: FC<TPropsYears> = ({
  setCurrentDate,
  setCurrentMonth,
  setCurrentYear,
  setModal,
  currentDate,
  inputText,
  setErrorInput,
}: TPropsYears) => {
  const currentYear: number = currentDate.getFullYear();
  const [displayedYear, setDisplayedYear] = useState(currentYear);
  const [listYears, setListYears] = useState<number[]>([]);

  useEffect(() => {
    const startYear = displayedYear - 4;
    const lastYear = displayedYear + 8;
    const years = [];
    for (let i = startYear; i < lastYear; i++) {
      years.push(i);
    }
    setListYears(years);
  }, [displayedYear]);

  const selectYear = (e: React.MouseEvent<HTMLLIElement>): void => {
    const li = e.target as HTMLLIElement;
    setDisplayedYear(Number(li.textContent));
    setCurrentDate(
      (prevDate) => new Date(Number(li.textContent), prevDate.getMonth(), 1)
    );
  };
  const handleBtnConfirm = (): void => {
    setCurrentMonth(true);
    setCurrentYear(false);
  };
  const handleBtnCancelled = (): void => {
    setModal(false);
    if (!inputText) {
      setErrorInput(true);
    }
  };
  return (
    <div>
      <ul className={styles.listYears}>
        {listYears.map((year, index) => {
          return (
            <li
              onClick={selectYear}
              className={`${styles.itemYear} ${
                index === 4 ? styles.active : null
              }`}
              key={index}
              tabIndex={1}
            >
              {year}
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

export default ListYears;
