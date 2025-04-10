import { Dispatch, FC, SetStateAction, useRef } from 'react';
import styles from './ListMonths.module.scss';
import { namesMonth } from '../../data/data';
type Props = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setCurrentMonth: Dispatch<SetStateAction<boolean>>;
};
const ListMonths: FC<Props> = ({ setCurrentDate, setCurrentMonth }: Props) => {
  const ref = useRef(null);
  const selectNameMonth = (e: any) => {
    ref.current = e.target;
  };
  const handleBtnConfirm = (): void => {
    const nameSelectMonth = (ref.current as unknown as HTMLLIElement)
      .textContent;
    const month = namesMonth.indexOf(nameSelectMonth as string);
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
    setCurrentMonth(false);
  };
  return (
    <div>
      <ul className={styles.listMonth}>
        {namesMonth.map((month, index) => {
          return (
            <li
              onClick={selectNameMonth}
              className={styles.monthName}
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
        <button className={styles.btnCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default ListMonths;
