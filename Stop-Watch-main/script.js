let timerInterval;
let startTime;
let totalElapsed = 0;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.getElementById('timeDisplay');
const toggleBtn = document.getElementById('toggleBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatElapsedTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const centiseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay(ms) {
    timeDisplay.textContent = formatElapsedTime(ms);
}

function toggleStartStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        totalElapsed += Date.now() - startTime;
        toggleBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            updateDisplay(Date.now() - startTime + totalElapsed);
        }, 10);
        toggleBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    totalElapsed = 0;
    isRunning = false;
    toggleBtn.textContent = 'Start';
    updateDisplay(totalElapsed);
    lapList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (isRunning) {
        if (lapCount < 10) {
            lapCount++;
            const lapTime = formatElapsedTime(Date.now() - startTime + totalElapsed);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
            lapList.appendChild(lapItem);
        } else {
            alert('You have reached the maximum number of laps.');
        }
    }
}

toggleBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

updateDisplay(totalElapsed);
