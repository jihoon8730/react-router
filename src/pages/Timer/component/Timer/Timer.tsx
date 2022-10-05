import { useState } from "react";
import Input from "../Input";
import TimerView from "../TimerView";
import "./Timer.css";
interface TimerType {
  initHour: number,
  initMin: number,
  initSec: number,
  closeMent: string
}
function Timer({ initHour, initMin, initSec, closeMent }: TimerType) {
  const [hour, setHour] = useState<number>(initHour);
  const [min, settMin] = useState<number>(initMin);
  const [sec, setSec] = useState<number>(initSec);
  const [isTimerDelete, setIsTimerDelete] = useState<boolean>(false);

  function timerDelete() {
    setIsTimerDelete(true);
  };
  return (
    <>
      {isTimerDelete === false ? (
        <div className="wrap">
          <div className="box">
            <TimerView
              timerViewHour={hour}
              timerViewMin={min}
              timerViewSec={sec}
            />
          </div>
          <div className="input-box">
            <div className="input-view">
              <Input
                sec={sec}
                setSec={setSec}
                min={min}
                setMin={settMin}
                hour={hour}
                setHour={setHour}
                closeMent={closeMent}
                timerDelete={timerDelete}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Timer;
