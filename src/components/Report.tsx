import { useTimersContext } from "../store/timers-context";

export default function Report() {
  const { intervalsCompleted } = useTimersContext();
  // displays reports section noting intervals completed
  return <h2>Intervals Completed: {intervalsCompleted}</h2>;
}
