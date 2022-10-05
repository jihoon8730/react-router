import * as React from "react";
import { useState, useRef, SetStateAction, Dispatch } from "react";
import "./Input.css";

interface InputType {
  sec: number,
  setSec: Dispatch<SetStateAction<number>>,
  min: number,
  setMin: Dispatch<SetStateAction<number>>,
  hour: number,
  setHour: Dispatch<SetStateAction<number>>,
  closeMent: string,
  timerDelete: any;
};


function Input({
  sec,
  setSec,
  min,
  setMin,
  hour,
  setHour,
  closeMent,
  timerDelete,
}: InputType) {
  const [offInput, setOffInput] = useState<boolean>(false);
  const [restartAndstop, setRestartAndStop] = useState<boolean>(false);

  const initialTime =
    hour * 60 * 60 + min * 60 + sec;
  
  const interval = useRef<NodeJS.Timer | null >(null);

  const onHourChange = (e: React.FormEvent<HTMLInputElement>, time: number | string, comment: string) => {
    let { value } = e.target as HTMLInputElement;
    if (value.length > 2) {
      value = value.substr(0, 2);
    } else if (value > time) {
      alert(`${comment}를 초과할 수 없습니다`);
      e.preventDefault();
    }
    setHour(Number(value));
  };

  const onMinChange = (e: React.FormEvent<HTMLInputElement>, time: number | string, comment: string ) => {
    let { value } = e.target as HTMLInputElement;;
    if (value.length > 2) {
      value = value.substr(0, 2);
    } else if (value > time) {
      alert(`${comment}를 초과할 수 없습니다`);
      e.preventDefault();
    }
    setMin(Number(value));
  };

  const onSecChange = (e: React.FormEvent<HTMLInputElement>, time: number | string, comment: string ) => {
    let { value } = e.target as HTMLInputElement;;
    if (value.length > 2) {
      value = value.substr(0, 2);
    } else if (value > time) {
      alert(`${comment}를 초과할 수 없습니다`);
      setSec(0);
      e.preventDefault();
    }
    setSec(Number(value));
  };
  
  let calc = initialTime;
  const onClickCount = () => {
    interval.current = setInterval(() => {
      calc = calc - 1;
      setSec(calc % 60);
      setMin(parseInt(String((calc / 60) % 60)));
      setHour(parseInt(String(calc / 60 / 60)));
      if (calc <= 0) {
        alert(closeMent);
        clearInterval(interval.current as NodeJS.Timer);
      }
      return () => {
        clearInterval(interval.current as NodeJS.Timer);
      };
    }, 1000);
    
  };

  const onClickStartCount = () => {
    setOffInput(true);
  };

  const onClickCancel = () => {
    clearInterval(interval.current as NodeJS.Timer);
    setHour(0);
    setMin(0);
    setSec(0);
    setOffInput(false);
    setRestartAndStop(false);
  };

  const onClickStop = () => {
    clearInterval(interval.current as NodeJS.Timer);
    setRestartAndStop(true);
  };

  const onClickRestart = () => {
    onClickCount();
    setRestartAndStop(false);
  };

  return (
    <div className="Input">
      <div className={offInput === true ? "input-box-togle" : "input-box"}>
        <input
          className="input-item"
          type="number"
          placeholder="H"
          value={hour}
          min="0"
          max="99"
          onChange={(e) => onHourChange(e, 99, "99")}
        />
        <input
          className="input-item"
          type="number"
          placeholder="M"
          value={min}
          min="0"
          max="59"
          onChange={(e) => onMinChange(e, 59, "59")}
        />
        <input
          className="input-item"
          type="number"
          placeholder="S"
          value={sec}
          min="0"
          max="59"
          onChange={(e) => onSecChange(e, 59, "59")}
        />
      </div>
      <div className={offInput === true ? "start-btn-box" : "start-btn"}>
        <button
          className="btn-start"
          onClick={() => {
            onClickCount();
            onClickStartCount();
          }}
        >
          시작
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            timerDelete();
            clearInterval(interval.current as NodeJS.Timer);
          }}
        >
          제거
        </button>
      </div>
      <div className={offInput === true ? "" : "btn-cancel-box"}>
        <button className="btn-cancel cancel-color" onClick={onClickCancel}>
          취소
        </button>
        <button
          className={
            restartAndstop === false
              ? "btn-cancel stop-color"
              : "stop-color-none"
          }
          onClick={onClickStop}
        >
          정지
        </button>
        <button
          className={
            restartAndstop === true
              ? "btn-cancel restart-color"
              : "restart-color-none"
          }
          onClick={onClickRestart}
        >
          재개
        </button>
      </div>
    </div>
  );
}

export default Input;
