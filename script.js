const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progress = document.getElementById("progress");

let tasks = [];

function updateDashboard() {
    const completed = tasks.filter(task => task.done).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;

    const percentage = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    progress.textContent = percentage + "%";
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.done) {
            li.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked;

            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);

            renderTasks();
        });

        li.append(checkbox, span, deleteBtn);
        taskList.appendChild(li);
    });

    updateDashboard();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        done: false
    });

    taskInput.value = "";

    renderTasks();
});

// Dark mode

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});

// Pomodoro timer

let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
    if (timerInterval !== null) {
        return;
    }

    startBtn.textContent = "Running...";

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            startBtn.textContent = "Start";

            alert("🎉 Study session completed!");
        }
    }, 1000);
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);

    timerInterval = null;
    timeLeft = 25 * 60;

    startBtn.textContent = "Start";

    updateTimerDisplay();
});

updateDashboard();
updateTimerDisplay();