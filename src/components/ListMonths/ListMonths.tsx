import { Dispatch, FC, SetStateAction, useRef } from 'react';
import styles from './ListMonths.module.scss';
import { namesMonth } from '../../data/data';
type Props = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setCurrentMonth: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentDate: Date;
  inputText: string;
  setErrorInputText: Dispatch<SetStateAction<boolean>>;
};
const ListMonths: FC<Props> = ({
  setCurrentDate,
  setCurrentMonth,
  setModal,
  currentDate,
  inputText,
  setErrorInputText,
}: Props) => {
  const currentMonthName = namesMonth[currentDate.getMonth()];

  const ref = useRef(null);
  const selectNameMonth = (e: any): void => {
    ref.current = e.target;
    const nameSelectMonth = (ref.current as unknown as HTMLLIElement)
      .textContent;
    const month = namesMonth.indexOf(nameSelectMonth as string);
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), month, 1));
  };
  const handleBtnConfirm = (): void => {
    setCurrentMonth(false);
  };
  const handleBtnCancelled = (): void => {
    setModal(false);
    if (!inputText) {
      setErrorInputText(true);
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
