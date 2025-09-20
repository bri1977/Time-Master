 // Mode Switching
        const modeButtons = document.querySelectorAll('.mode-btn');
        const modes = document.querySelectorAll('.clock-mode, .stopwatch-mode, .timer-mode');
        
        modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.getAttribute('data-mode');
                
                // Update active button
                modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show selected mode
                modes.forEach(m => m.classList.remove('active-mode'));
                document.querySelector(`.${mode}-mode`).classList.add('active-mode');
            });
        });
        
        // Clock Functionality
        function updateClock() {
            var hours = document.getElementById('hour');
            var minutes = document.getElementById('minutes');
            var seconds = document.getElementById('seconds');
            var ampm = document.getElementById('ampm');

            var h = new Date().getHours();
            var m = new Date().getMinutes();
            var s = new Date().getSeconds();
            var am = h >= 12 ? 'PM' : 'AM';

            // Convert to 12-hour format
            h = h % 12 || 12;

            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;

            hours.innerHTML = h;
            minutes.innerHTML = m;
            seconds.innerHTML = s;
            ampm.innerHTML = am;
        }

        setInterval(updateClock, 1000);
        updateClock(); // Initial call
        
        // Stopwatch Functionality
        const stopwatchDisplay = document.querySelector('.stopwatch-display');
        const startBtn = document.querySelector('.stopwatch-mode .start-btn');
        const stopBtn = document.querySelector('.stopwatch-mode .stop-btn');
        const resetBtn = document.querySelector('.stopwatch-mode .reset-btn');
        const lapBtn = document.querySelector('.stopwatch-mode .lap-btn');
        const lapTimes = document.querySelector('.lap-times');
        
        let stopwatchTime = 0;
        let stopwatchInterval;
        let stopwatchRunning = false;
        
        function formatTime(ms) {
            let hours = Math.floor(ms / 3600000);
            let minutes = Math.floor((ms % 3600000) / 60000);
            let seconds = Math.floor((ms % 60000) / 1000);
            let milliseconds = Math.floor((ms % 1000) / 10);
            
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        }
        
        function updateStopwatch() {
            stopwatchTime += 10;
            stopwatchDisplay.textContent = formatTime(stopwatchTime);
        }
        
        startBtn.addEventListener('click', () => {
            if (!stopwatchRunning) {
                stopwatchInterval = setInterval(updateStopwatch, 10);
                stopwatchRunning = true;
                startBtn.disabled = true;
                stopBtn.disabled = false;
            }
        });
        
        stopBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
        });
        
        resetBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            stopwatchTime = 0;
            stopwatchDisplay.textContent = formatTime(stopwatchTime);
            stopwatchRunning = false;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            lapTimes.innerHTML = '';
        });
        
        lapBtn.addEventListener('click', () => {
            if (stopwatchRunning) {
                const lapTime = document.createElement('div');
                lapTime.textContent = `Lap ${lapTimes.childElementCount + 1}: ${formatTime(stopwatchTime)}`;
                lapTimes.appendChild(lapTime);
                lapTimes.scrollTop = lapTimes.scrollHeight;
            }
        });
        
        // Timer Functionality
        const hoursInput = document.getElementById('hours-input');
        const minutesInput = document.getElementById('minutes-input');
        const secondsInput = document.getElementById('seconds-input');
        const timerDisplay = document.querySelector('.timer-display');
        const setBtn = document.querySelector('.timer-controls .set-btn');
        const timerStartBtn = document.querySelector('.timer-controls .start-btn');
        const timerStopBtn = document.querySelector('.timer-controls .stop-btn');
        const timerResetBtn = document.querySelector('.timer-controls .reset-btn');
        
        let timerTime = 0;
        let timerInterval;
        let timerRunning = false;
        
        function updateTimerDisplay() {
            let hours = Math.floor(timerTime / 3600000);
            let minutes = Math.floor((timerTime % 3600000) / 60000);
            let seconds = Math.floor((timerTime % 60000) / 1000);
            
            timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        function setTimer() {
            const hours = parseInt(hoursInput.value) || 0;
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            
            timerTime = (hours * 3600000) + (minutes * 60000) + (seconds * 1000);
            updateTimerDisplay();
        }
        
        function updateTimer() {
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                timerRunning = false;
                timerStartBtn.disabled = false;
                timerStopBtn.disabled = true;
                // Play sound or alert when timer completes
                alert('Timer finished!');
                return;
            }
            
            timerTime -= 1000;
            updateTimerDisplay();
        }
        
        setBtn.addEventListener('click', setTimer);
        
        timerStartBtn.addEventListener('click', () => {
            if (!timerRunning && timerTime > 0) {
                timerInterval = setInterval(updateTimer, 1000);
                timerRunning = true;
                timerStartBtn.disabled = true;
                timerStopBtn.disabled = false;
            }
        });
        
        timerStopBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            timerRunning = false;
            timerStartBtn.disabled = false;
            timerStopBtn.disabled = true;
        });
        
        timerResetBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            setTimer();
            timerRunning = false;
            timerStartBtn.disabled = false;
            timerStopBtn.disabled = true;
        });
        
        // Initialize timer display
        setTimer();