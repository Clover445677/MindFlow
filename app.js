// Получение элементов DOM
const habitForm = document.getElementById('add-habit');
const habitNameInput = document.getElementById('habit-name');
const habitFrequencySelect = document.getElementById('habit-frequency');
const habitList = document.getElementById('habits');
const resetBtn = document.getElementById('reset-btn');
const themeToggle = document.getElementById('theme-toggle');
const weeklyStats = document.getElementById('weekly-stats');

// Настройки
const STORAGE_KEY = 'mindflow_habits';
const DEFAULT_THEME = 'light';

// Инициализация
init();

// Функции
function init() {
    // Загрузка данных из localStorage
    loadHabits();
    
    // Загрузка темы
    loadTheme();
    
    // Обработчики событий
    habitForm.addEventListener('submit', addHabit);
    resetBtn.addEventListener('click', resetData);
    themeToggle.addEventListener('click', toggleTheme);
}

function addHabit(e) {
    e.preventDefault();
    
    // Получение типа привычки
    const type = document.querySelector('input[name="habit-type"]:checked').value;
    const name = habitNameInput.value.trim();
    const frequency = habitFrequencySelect.value;
    
    if (!name) return;
    
    const habit = {
        id: Date.now(),
        name,
        frequency,
        type, // Добавлено поле типа
        completed: {},
        lastCompleted: {} // Хранение времени последнего выполнения
    };
    
    // Сохранение в localStorage
    saveHabit(habit);
    // Удаление дублирующегося объявления name
    // const name = habitNameInput.value.trim();
    const name = habitNameInput.value.trim();
    const frequency = habitFrequencySelect.value;
    
    if (!name) return;
    
    const habit = {
        id: Date.now(),
        name,
        frequency,
        completed: {} // Хранение дат выполнения
    };
    
    // Сохранение в localStorage
    saveHabit(habit);
    
    // Очистка формы
    habitForm.reset();
}

function saveHabit(habit) {
    let habits = getHabitsFromStorage();
    habits.push(habit);
    saveToStorage(habits);
    renderHabits();
}

function getHabitsFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        <div class="progress-container">
            <span class="percentage">${getCompletionPercentage(habit)}%</span>
            <div class="progress-bar" style="width: ${getCompletionPercentage(habit)}%"></div>
        </div>
}

function loadHabits() {
    const habits = getHabitsFromStorage();
    habits.forEach(habit => {
        createHabitElement(habit);
    });
}

    // Обновление прогресса и таймера
    updateProgress(habit);
    timerSpan.textContent = `⏳ ${getRemainingTime(habit)} `;
    // Таймер 24 часов
    const timerSpan = document.createElement('span');
    timerSpan.style.fontSize = '12px';
    timerSpan.style.color = '#6C63FF';
    timerSpan.style.marginLeft = '8px';
    timerSpan.textContent = `⏳ ${getRemainingTime(habit)} `;
    li.appendChild(timerSpan);
function getRemainingTime(habit) {
    const now = Date.now();
    const lastCompleted = habit.lastCompleted[habit.id];
    
    if (!lastCompleted) return '24:00';
    
    const timeDiff = now - lastCompleted;
    const hours = Math.floor((24 * 60 * 60 * 1000 - timeDiff) / (60 * 60 * 1000));
    const minutes = Math.floor((24 * 60 * 60 * 1000 - timeDiff) / (60 * 1000)) % 60;
function updateProgress(habit) {
    const li = document.querySelector(`.habit-item[data-id="${habit.id}"]`);
    const progressBar = li.querySelector('.progress-bar');
    const percentageSpan = li.querySelector('.percentage');
    
    let percentage = 0;
    
    if (habit.type === 'positive') {
        percentage = Math.min(100, Math.floor((habit.completed[habit.id] || 0) / 7 * 100));
    } else {
        percentage = Math.max(0, 100 - Math.floor((habit.completed[habit.id] || 0) / 7 * 100));
    }
    
    progressBar.style.width = `${percentage}%`;
    percentageSpan.textContent = `${percentage}%`;
}
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function updateProgress(habit) {
    const li = document.querySelector(`.habit-item[data-id="${habit.id}"]`);
    const progress = li.querySelector('progress');
    const percentageSpan = li.querySelector('.percentage');
    
    let percentage = 0;
    
    if (habit.type === 'positive') {
        // Логика для позитивных привычек
        percentage = Math.min(100, Math.floor((habit.completed[habit.id] || 0) / 7 * 100));
// Добавляем обработчик для переключения темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
    } else {
        // Логика для негативных привычек
        percentage = Math.max(0, 100 - Math.floor((habit.completed[habit.id] || 0) / 7 * 100));
    }
    
    progress.value = percentage;
    percentageSpan.textContent = `${percentage}%`;
}

// Обновление прогресса при загрузке
window.addEventListener('load', () => {
    const habits = getHabitsFromStorage();
    habits.forEach(habit => {
        updateProgress(habit);
    });
});
function createHabitElement(habit) {
    const li = document.createElement('li');
    li.className = 'habit-item';
    
    li.innerHTML = `
        <span>${habit.name}</span>
        <button class="complete-btn" data-id="${habit.id}">
            ${habit.completed[habit.id] ? '✅' : '⬜'}
        </button>
        <progress value="${getCompletionPercentage(habit)}" max="100"></progress>
    `;
    
    // Обработчик отметки выполнения
    li.querySelector('.complete-btn').addEventListener('click', () => {
        toggleHabitCompletion(habit.id);
    });
    
    habitList.appendChild(li);
    // Добавляем проценты рядом с прогресс-баром
    const percentageSpan = document.createElement('span');
    percentageSpan.style.fontSize = '13px';
    percentageSpan.style.fontWeight = '600';
    percentageSpan.style.color = '#6C63FF';
    percentageSpan.style.minWidth = '40px';
    percentageSpan.textContent = `${getCompletionPercentage(habit)}%`;
    li.appendChild(percentageSpan);
}

function toggleHabitCompletion(habitId) {
    const habits = getHabitsFromStorage();
    const habit = habits.find(h => h.id === habitId);
    
    if (!habit) return;
    
    // Переключение состояния
    habit.completed[habitId] = !habit.completed[habitId];
    saveToStorage(habits);
    renderHabits();
}

function getCompletionPercentage(habit) {
    // Пример вычисления процента выполнения
    // В реальном приложении нужно реализовать логику на основе дат
    return 50; // Заглушка
}

function renderHabits() {
    habitList.innerHTML = '';
    const habits = getHabitsFromStorage();
    habits.forEach(habit => {
        createHabitElement(habit);
    });
}

function resetData() {
    if (confirm('Вы уверены, что хотите сбросить все данные?')) {
        localStorage.removeItem(STORAGE_KEY);
        renderHabits();
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || DEFAULT_THEME;
    document.body.className = savedTheme;
}

function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
}

// Дополнительные функции для статистики и отображения диаграмм
// будут добавлены в следующих итерациях