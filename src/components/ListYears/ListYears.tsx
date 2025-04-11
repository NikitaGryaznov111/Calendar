import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './ListYears.module.scss';

type Props = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setCurrentMonth: Dispatch<SetStateAction<boolean>>;
  setCurrentYear: Dispatch<SetStateAction<boolean>>;
};
const ListYears: FC<Props> = ({
  setCurrentDate,
  setCurrentMonth,
  setCurrentYear,
}: Props) => {
  const currentYear: number = new Date().getFullYear();
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

  const selectYear = (e: any): void => {
    setDisplayedYear(Number(e.target.textContent));
    setCurrentDate(
      (prevDate) =>
        new Date(Number(e.target.textContent), prevDate.getMonth(), 1)
    );
  };
  const handleBtnConfirm = (): void => {
    setCurrentMonth(true);
    setCurrentYear(false);
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
        <button className={styles.btnCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default ListYears;
