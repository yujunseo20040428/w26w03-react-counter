import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // 타이머 실행
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        // 시간이 끝나면 집중 ↔ 휴식 전환
        setIsBreak(!isBreak);
        setMinutes(isBreak ? 25 : 5);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds, isBreak]);

  // 초기화
  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="app">
      <div className="timer">
        <h1>Timer</h1>

        <p className="mode">
          {isBreak ? "☕ 휴식 시간" : "🔥 집중 시간"}
        </p>

        <div className="time">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        <div className="buttons">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "일시정지" : "시작"}
          </button>

          <button onClick={resetTimer}>초기화</button>
        </div>
      </div>
    </div>
  );
}

export default App;
