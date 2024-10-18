import Timers from "./components/Timers.tsx";
import AddTimer from "./components/AddTimer.tsx";
import Header from "./components/Header.tsx";
import Report from "./components/Report.tsx";
import TimerPopup from "./components/TimerPopup.tsx";
import { TimersContextProviders } from "./store/timers-context.tsx";

function App() {
  return (
    <TimersContextProviders>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
      <TimerPopup />
      <Report />
    </TimersContextProviders>
  );
}

export default App;
