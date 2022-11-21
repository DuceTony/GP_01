// Elements from the HTML popup
const displayDate = document.getElementById('displayDate');
const timer       = document.getElementById('timer');
const startBtn    = document.getElementById('start');
const stopBtn     = document.getElementById('stop');
const resetBtn    = document.getElementById('reset');

/*
 *  The function below handles the communication between the popup and the background script
 *  It sends the element that was clicked as an object to the background script, it uses each btn ID to handle the timer
 *  It later on handles the response, and errors from the background script
*/
startBtn.addEventListener('click', () => {
    console.log('Start btn pressed');
    const sending = browser.runtime.sendMessage({
        action: startBtn.id
    });
    sending.then (
        (background) => {
            console.info(`From the background script: ${background.response}`);
            timerStartedAt();
        },
        (error) => {
            console.error(`Background script error: ${error}`);
        }
    );
});

stopBtn.addEventListener('click', () => {
    console.info('Stop btn pressed');
    const sending = browser.runtime.sendMessage({
        action: stopBtn.id
    });
    sending.then (
        (background) => {
            console.info(`From the background script: ${background.response}`);
            timerStartedAt();
        },
        (error) => {
            console.error(`Background script error: ${error}`);
        }
    );
});

resetBtn.addEventListener('click', handleReset);

// Here we get the current time, that is used to display when the timer was started
function timerStartedAt() {
    const date = new Date();

    const hr  = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    displayDate.innerHTML = 'Timer started ' + hr + ':' + min;
}

// Stops all alarms running, and resets all HTML
function handleReset() {
    browser.alarms.clearAll();
    timer.innerHTML = '00:00:00';
    displayDate.innerHTML = ''
}