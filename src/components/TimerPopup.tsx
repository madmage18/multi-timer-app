import { type FormEvent, useState, useEffect } from "react";
import { useTimersContext } from "../store/timers-context";

export default function TimerPopup() {
  const { allTimersCompleted, resetTimers, addInterval, stopTimers } = useTimersContext();

  // popup form states
  const [showPopup, setShowPopup] = useState(false);
  const [userSelection, setUserSelection] = useState<boolean | null>(null);

  useEffect(() => {
    if (allTimersCompleted) {
      setShowPopup(true);
    }
  }, [allTimersCompleted]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userSelection) {
      addInterval(); // increments the interval state. # is shown in <Reports/>
    }
    stopTimers(); // prevents timers from running immediately once reset
    resetTimers(); 
    setShowPopup(false); 
  };

  return showPopup ? (
    <div className="popup-overlay">
      <div className="popup-content">
        <form onSubmit={handleFormSubmit}>
          <p className="uw-husky-popup">
            All timers have completed. Mark interval complete in Report?
          </p>
          <div className="form-group">
            {/* Update to use my input subcomponents! */}
            <label className="uw-husky-popup">
              <input
                type="radio"
                // value={true}
                checked={userSelection === true}
                onChange={() => setUserSelection(true)}
              />
              Yes
            </label>
          </div>
          <div className="form-group">
            <label className="uw-husky-popup">
              <input
                type="radio"
                // value={false}
                checked={userSelection === false}
                onChange={() => setUserSelection(false)}
              />
              No
            </label>
          </div>
          <button className="uw-husky-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : null;
}
