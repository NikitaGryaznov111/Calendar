import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { namesMonth } from '../../data/data';
import ListMonths from '../ListMonths/ListMonths';
import ListDays from '../ListDays/ListDays';
import ListYears from '../ListYears/ListYears';
import styles from './ModalCalendar.module.scss';
type Props = {
  modal: boolean;
  setInputDate: Dispatch<SetStateAction<string>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  inputDate: string;
  inputText: string;
  setErrorInputText: Dispatch<SetStateAction<boolean>>;
};
const ModalCalendar: FC<Props> = ({
  modal,
  setInputDate,
  setInputText,
  inputDate,
  setModal,
  inputText,
  setErrorInputText,
}: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<boolean>(false);

  useEffect(() => {
    if (!inputDate) {
      setCurrentDate(new Date());
    } else {
      const [inputYear, inputMonth, inputDay] = inputDate.split('-');
      setCurrentDate(
        (prevDate) =>
          new Date(Number(inputYear), Number(+inputMonth - 1), Number(inputDay))
      );
    }
  }, [inputDate]);
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
    <div className={modal ? styles.calendarActive : styles.calendar}>
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
          currentDate={currentDate}
          setModal={setModal}
          inputText={inputText}
          setErrorInputText={setErrorInputText}
        />
      ) : (
        <>
          {currentYear ? (
            <ListYears
              setCurrentDate={setCurrentDate}
              setCurrentMonth={setCurrentMonth}
              setCurrentYear={setCurrentYear}
              currentDate={currentDate}
              setModal={setModal}
              inputText={inputText}
              setErrorInputText={setErrorInputText}
            />
          ) : (
            <ListDays
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              setInputText={setInputText}
              setInputDate={setInputDate}
              setModal={setModal}
              inputText={inputText}
              setErrorInputText={setErrorInputText}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ModalCalendar;
