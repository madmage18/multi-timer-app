import Button from "./shared/Button";
import { useTimersContext } from "../store/timers-context";

export default function Header() {
  const { isRunning, stopTimers, startTimers, resetTimers } =
    useTimersContext(); // destructure values needed from timersContext

  return (
    <header>
      <div>
        <h1>Sprinter Workout</h1>
      </div>
      <div>
        <Button onClick={isRunning ? stopTimers : startTimers}>
          {isRunning ? "Stop" : "Start"} Timers
        </Button>
        <Button onClick={resetTimers}>Reset Timers</Button>
      </div>
    </header>
  );
}
