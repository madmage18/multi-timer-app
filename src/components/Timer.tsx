import { useEffect, useState, useRef } from "react";
import Container from "./shared/Container";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timers-context.tsx";
// import alertSound from "../../public/alert-sound.mp3";

export default function Timer(props: TimerProps) {
  const interval = useRef<number | null>(null); // holds timer reference
  const [remainingTime, setRemainingTime] = useState(props.duration * 1000); // duration * 1000 to convert to ms
  const [individualTimerResets, setIndividualTimerResets] = useState(0);

  // context used in compononet
  const {
    isRunning,
    resetTimersNumber,
    completedTimer,
    timers,
    markAllTimersCompleted,
    deleteTimer,
  } = useTimersContext(); // destructured values from timersContext

  const playSound = () => {
    const audio = new Audio("../../public/alert-sound.mp3");
    audio.play();
  };

  function handleDeleteTimer() {
    // using dispatching method deleteTime. desctructured timersData passed in as expected payload
    deleteTimer({
      name: props.name,
      duration: props.duration,
      isCompleted: props.isCompleted,
    });
  }

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  // starting all timers effects, resetting all timers effects
  useEffect(() => {
    let timer: number;
    // starting all Timers starts Timer
    if (isRunning) {
      // updates remainingTime state using setInterval((() => {}), []). Used to set Timer progress bar value.Updates every 50 ms
      timer = setInterval(function () {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            // timer stops at 0
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current); // cleaning up
    }

    // resetting all Timers resets Timer. (refactor in future)
    if (resetTimersNumber > individualTimerResets) {
      setRemainingTime(props.duration * 1000);
      let newIndividualTimerReset = individualTimerResets + 1;
      setIndividualTimerResets(newIndividualTimerReset);
    }

    return () => clearInterval(timer); // cleanup fn. Clears the entire timer before unmounting.
  }, [isRunning, resetTimersNumber, timers]);

  // Timer completes effects
  useEffect(() => {
    if (remainingTime <= 0) {
      playSound();
      completedTimer(props);
      return console.log(`remainingTime if ran`); // maybe delete this
    }
  }, [remainingTime]);

  // All timers completed effects. (state update triggers TimersPopup)
  useEffect(() => {    
    if (timers.every((timer) => timer.isCompleted)) {
      markAllTimersCompleted();
    }
  }, [timers]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // convert ms to s. Include 2 decimal places

  return (
    <Container as="article">
      <h2>{props.name}</h2>
      <p>
        {/* Managing time passing in ms */}
        <progress max={props.duration * 1000} value={remainingTime}></progress>
      </p>
      {/* Displaying a formatted time in s */}
      <p>{formattedRemainingTime}</p>
      <button className="button" onClick={handleDeleteTimer}>
        Delete
      </button>
    </Container>
  );
}
