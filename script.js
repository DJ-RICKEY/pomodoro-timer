class PomodoroTimer {
    constructor() {
        this.workMinutes = 25;
        this.breakMinutes = 5;
        this.isWorking = true;
        this.isRunning = false;
        this.interval = null;

        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start');
        this.stopButton = document.getElementById('stop');
        this.resetButton = document.getElementById('reset');
        this.workTimeInput = document.getElementById('work-time');
        this.breakTimeInput = document.getElementById('break-time');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.stopButton.addEventListener('click', () => this.stop());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workTimeInput.addEventListener('change', () => {
            this.workMinutes = parseInt(this.workTimeInput.value);
            if (!this.isRunning) this.updateDisplay();
        });
        this.breakTimeInput.addEventListener('change', () => {
            this.breakMinutes = parseInt(this.breakTimeInput.value);
            if (!this.isRunning) this.updateDisplay();
        });
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startButton.disabled = true;
        this.stopButton.disabled = false;
        this.resetButton.disabled = true;
        
        this.interval = setInterval(() => {
            this.updateDisplay();
            if (this.seconds === 0 && this.minutes === 0) {
                this.toggleMode();
                this.updateDisplay();
            }
        }, 1000);
    }

    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.interval);
        this.startButton.disabled = false;
        this.stopButton.disabled = true;
        this.resetButton.disabled = false;
    }

    reset() {
        this.stop();
        this.isWorking = true;
        this.updateDisplay();
    }

    toggleMode() {
        this.isWorking = !this.isWorking;
        this.stop();
        this.reset();
        this.start();
    }

    updateDisplay() {
        const minutes = this.isWorking ? this.workMinutes : this.breakMinutes;
        this.minutes = minutes;
        this.seconds = 0;
        
        if (this.isRunning) {
            if (this.seconds === 0) {
                if (this.minutes === 0) {
                    this.toggleMode();
                } else {
                    this.minutes--;
                    this.seconds = 59;
                }
            } else {
                this.seconds--;
            }
        }

        this.timerElement.textContent = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
    }
}

// タイマーの初期化
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
