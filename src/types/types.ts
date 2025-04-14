import { Dispatch, SetStateAction } from 'react';

export type TPropsModal = {
  modal: boolean;
  setInputDate: Dispatch<SetStateAction<string>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  inputDate: string;
  inputText: string;
  setErrorInput: Dispatch<SetStateAction<boolean>>;
};

export type TPropsDays = {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setInputText: Dispatch<SetStateAction<string>>;
  setInputDate: Dispatch<SetStateAction<string>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  inputText: string;
  setErrorInput: Dispatch<SetStateAction<boolean>>;
};

export type TPropsYears = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setCurrentMonth: Dispatch<SetStateAction<boolean>>;
  setCurrentYear: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentDate: Date;
  inputText: string;
  setErrorInput: Dispatch<SetStateAction<boolean>>;
};
export type TPropsMonth = {
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  setCurrentMonth: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
  currentDate: Date;
  inputText: string;
  setErrorInput: Dispatch<SetStateAction<boolean>>;
};
