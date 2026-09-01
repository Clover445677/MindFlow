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
}

function loadHabits() {
    const habits = getHabitsFromStorage();
    habits.forEach(habit => {
        createHabitElement(habit);
    });
}

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