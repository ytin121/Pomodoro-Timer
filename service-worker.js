let seconds = 25 * 60;
let timerIsRunning = false;

chrome.contextMenus.create(
    {
        id: "start-timer",
        title: "Start Timer",
        contexts: ["all"]
    }
);
chrome.contextMenus.create(
    {
        id: "reset-timer",
        title: "Reset Timer",
        contexts: ["all"]
    }
);

function createAlarm(name) {
    chrome.alarms.create(
        name,
        {
            periodInMinutes: 1 / 60
        }
    );
};

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function createNotification(message) {
    const opt = {
        type: "list",
        title: "Pomodoro Timer",
        message,
        items: [{ title: 'Pomodoro Timer', message: message }],
        iconUrl: 'images/clock-128.png',

    };
    chrome.notifications.create(opt);
}

function clearAlarm(name) {
    chrome.alarms.clear(
        name
    );

};
chrome.action.setBadgeText({
    text: formatTime(seconds),

});
chrome.action.setBadgeBackgroundColor(
    { color: "orange" }
);
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(formatTime(seconds));
    chrome.action.setBadgeText({
        text: formatTime(seconds),

    });
    if (seconds <= 0) {
        clearAlarm("pomodoro-timer");
        createNotification("Well Done you focused well");
        chrome.contextMenus.update("start-timer",
            {
                title: "Start Timer",
                contexts: ["all"]
            }

        );
        chrome.action.setBadgeText({
            text: formatTime(seconds),

        });
        chrome.action.setBadgeBackgroundColor(
            { color: "orange" }
        );
        seconds = 25 * 60;
    }
});



chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "start-timer":
            if (!timerIsRunning) {
                createNotification("Your Timer has started");
                createAlarm("pomodoro-timer");
                chrome.action.setBadgeBackgroundColor(
                    { color: "green" }
                );
                timerIsRunning = true;
                chrome.contextMenus.update("start-timer",
                    {
                        title: "Pause Timer",
                        contexts: ["all"]
                    }

                );
            } else {
                createNotification("Your Timer has stopped");
                timerIsRunning = false;
                chrome.contextMenus.update("start-timer",
                    {
                        title: "Resume Timer",
                        contexts: ["all"]
                    }
                );
                clearAlarm("pomodoro-timer");
                chrome.action.setBadgeBackgroundColor(
                    { color: "orange" }
                );
            }
            break;

        case "reset-timer":
            if (timerIsRunning) {
                createNotification("Your Timer has stopped");
                timerIsRunning = false;
                chrome.contextMenus.update("start-timer",
                    {
                        title: "Start Timer",
                        contexts: ["all"]
                    }
                );
                clearAlarm("pomodoro-timer");
                seconds = 25 * 60;
                chrome.action.setBadgeText({
                    text: formatTime(seconds),

                });
                chrome.action.setBadgeBackgroundColor(
                    { color: "orange" }
                );
            }
            break;
    }

});
// chrome.runtime.onInstalled.addListener((details) => {
//     if (details.reason == "install") {
//         // createContextMenus();

//     };
// });