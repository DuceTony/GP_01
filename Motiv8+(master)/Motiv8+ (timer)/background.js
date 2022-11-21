// Run each function based on the data.action string gathered frm the clicked btns on the popup
function popupMsgReceived(btn) {
    console.info('background received ', btn);
    switch(btn.action) {
        case 'start':
            handleStart();
            break;
        case 'stop':
            handleStop();
            break;
        case 'reset':
            handleReset();
            break;
    }
}

// Function to send back data to the popup.js script
function notifyPopupPage(req, sender, sendRes) {
    sendRes({
        response: 'Response from background script'
    });
}

/*
 *  An alarm is created every second that runs the startTimer function
*/
function handleStart() {
    browser.alarms.onAlarm.addListener(startTimer);
    browser.alarms.create('startTimer', {
        periodInMinutes: 1 / 60
    });
    console.info('Handler started')
}

// Stops the loop for the startTimer alarm
function handleStop() {
    console.info('Handler/Timer stopped')
    browser.alarms.clear('startTimer');
}

/* 
 *  startTimer() handles the running timer logic
 *  We begin with parsing the clock string values to integers
 *  The logic later handles the sec, min and hours like a digital clock
*/

let hr  = 0;
let min = 0;
let sec = 0;

function startTimer() {
    hr  = parseInt(hr);
    min = parseInt(min);
    sec = parseInt(sec);

    sec++;

    console.log('Timer (secs) ', sec);

    if (sec == 60) {
        min += 1;
        sec = 0;
    } else if (min == 60) {
        hr += 1;
        min = 0;
        sec = 0;
    }

    if (sec < 10) {
        sec = '0' + sec;
    } 
    
    if (min < 10) {
        min = '0' + min;
    } 
    
    if (hr < 10) {
        hr = '0' + hr;
    }
}
browser.runtime.onMessage.addListener(popupMsgReceived);
browser.runtime.onMessage.addListener(notifyPopupPage);