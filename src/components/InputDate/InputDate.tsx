import { FC, useState } from 'react';
import ModalCalendar from '../ModalCalendar/ModalCalendar';
import styles from './InputDate.module.scss';

const InputDate: FC = () => {
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState(inputText);
  const [toggle, setToggle] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [errorInputText, setErrorInputText] = useState<boolean>(false);
  const handleInputDate = (event: any): void => {
    const value = event.target.value;
    setInputDate(value);
  };
  const handleInputText = (): void => {
    setToggle(false);
  };

  const handleOpenModalCalendar = (): void => {
    setModal(!modal);
  };
  const handleClearingDate = (): void => {
    setToggle(true);
    setInputText('');
    setInputDate('');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperDate}>
        {toggle ? (
          <input
            className={`${errorInputText ? styles.errorInput : styles.text}`}
            type="text"
            placeholder="Выберите дату"
            onClick={handleInputText}
            value={inputText}
            onChange={handleInputDate}
          />
        ) : (
          <input
            className={styles.date}
            type="date"
            placeholder="Выберите дату"
            value={inputDate}
            onChange={handleInputDate}
          />
        )}
        <button
          type="button"
          onClick={handleClearingDate}
          className={inputDate ? styles.btnClear : ''}
        ></button>
        <button
          onClick={handleOpenModalCalendar}
          type="button"
          className={styles.btnIconCalendar}
        ></button>
      </div>
      <ModalCalendar
        modal={modal}
        setInputText={setInputText}
        setInputDate={setInputDate}
        inputDate={inputDate}
        setModal={setModal}
        inputText={inputText}
        setErrorInputText={setErrorInputText}
      />
    </div>
  );
};

export default InputDate;
