import "./TimerView.css";

interface TimerViewType {
  timerViewHour: string | number,
  timerViewMin: string | number,
  timerViewSec: string | number,
}
function View({ timerViewHour, timerViewMin, timerViewSec }: TimerViewType) {
  return (
    <div className="view">
      {timerViewHour} : {timerViewMin} : {timerViewSec}
    </div>
  );
}

export default View;
