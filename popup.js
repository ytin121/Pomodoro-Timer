let timerInterval;
let timerRunning = false;
let timerDuration = 25 * 60; // Default timer duration in seconds (25 minutes)
let timeLeft = timerDuration;

const timerDurationInput = document.getElementById('timer-duration');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timeDisplay = document.getElementById('time-left');

// Initialize timer display
updateTimerDisplay();

// Event listeners
timerDurationInput.addEventListener('change', () => {
  timerDuration = parseInt(timerDurationInput.value) * 60; // Convert minutes to seconds
  timeLeft = timerDuration;
  updateTimerDisplay();
});

startBtn.addEventListener('click', () => {
  if (!timerRunning) {
    startTimer();
  } else {
    pauseTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

// Functions
function updateTimerDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  timerRunning = true;
  startBtn.textContent = 'Pause Timer';

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      startBtn.textContent = 'Start Timer';
      createNotification("Well Done! You focused well.");
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  startBtn.textContent = 'Start Timer';
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  startBtn.textContent = 'Start Timer';
  timeLeft = timerDuration;
  updateTimerDisplay();
}

function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function createNotification(message) {
  const opt = {
    type: "basic",
    title: "Pomodoro Timer",
    message: message,
    iconUrl: 'images/clock-128.png',
  };
  chrome.notifications.create(opt);
}
