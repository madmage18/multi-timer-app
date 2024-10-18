# multi-timer-app

- Perfect for starting multiple athletes running for different periods of time. When all timers finish, TimersPopup prompts user to update a running tally of intervals completed. 
- React, Typescript app. ContextAPI for state management. 
- useEffect() hook used heavily to manage the side effects of state changes. useReducer() used for state update logic. User entered data is sanitized. /shared folder feature reusable subcomponents. favicon added.
- App is preloaded with three timers. Users may Reset, Start, Stop all Timers, Add/Delete individual Timers, Update 'completed interval' tally. 

<b>Main branch deployed at: https://multi-timer-app.vercel.app/</b><br>

## To Add to Git Issues:
- Add local storage or redis to persist data
- Address accessibility issues identified by Vercel.
- Memoize components to improve rendering performance. (Add screenshots to issue of current performance slow downs)
- using name instead of unique ids to differentiate Timers. May cause issues in future if multiple timers with the same name.
- interfaces are spread across files. (follow best practice and keep the in separate files, keep files clean)
- should resuse form component and input components in timerPopup component. (fix repetative code)
- not using eslint at this time. Add it / enable it.

## Future enhancements:
- Add Popup on inital load of app with "Please select you school" and dropdown select.
Dropdown options will include:
    - Columbia University - Lions
    - Univeristy of Washignton - Huskies
    - Independent

    Selections will toggle the color scheme and athletic logos used in the App UI.

## Deployments:
 - Vercel deployment: https://multi-timer-app.vercel.app/

- Branch has also been updated to deploy to Heroku. Not deployed to Heroku at this time 