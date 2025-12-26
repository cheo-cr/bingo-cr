// Estado del juego
let drawnNumbers = [];
let availableNumbers = [];
let currentGameType = 'carton-lleno';
let totalNumbers = 75;

// Tipos de juegos con columnas activas
const GAME_TYPES = {
    'carton-lleno': { name: 'Cartón Lleno', columns: ['B', 'I', 'N', 'G', 'O'] },
    '4-esquinas': { name: '4 Esquinas', columns: ['B', 'O'] },
    'fila-llena': { name: 'Fila Llena', columns: ['B', 'I', 'N', 'G', 'O'] },
    'x': { name: 'X', columns: ['B', 'I', 'N', 'G', 'O'] },
    'l': { name: 'L', columns: ['B', 'I', 'N', 'G', 'O'] },
    'h': { name: 'H', columns: ['B', 'I', 'N', 'G', 'O'] }
};

// Elementos del DOM
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const gameModal = document.getElementById('gameModal');
const currentBall = document.getElementById('currentBall');
const ballNumber = document.getElementById('ballNumber');
const cantoDisplay = document.getElementById('cantoDisplay');
const drawnNumbersGrid = document.getElementById('drawnNumbersGrid');
const ballCount = document.getElementById('ballCount');

// Inicializar juego
function initGame() {
    const activeColumns = GAME_TYPES[currentGameType].columns;
    const activeNumbers = [];
    
    // Generar números disponibles según columnas activas
    activeColumns.forEach(col => {
        let start, end;
        switch(col) {
            case 'B': start = 1; end = 15; break;
            case 'I': start = 16; end = 30; break;
            case 'N': start = 31; end = 45; break;
            case 'G': start = 46; end = 60; break;
            case 'O': start = 61; end = 75; break;
        }
        for (let i = start; i <= end; i++) {
            activeNumbers.push(i);
        }
    });
    
    availableNumbers = [...activeNumbers];
    totalNumbers = activeNumbers.length;
    drawnNumbers = [];
    ballNumber.textContent = '-';
    cantoDisplay.textContent = 'Presiona "Sacar Bola" para comenzar';
    currentBall.className = 'ball';
    ballCount.textContent = `0/${totalNumbers}`;
    drawBtn.disabled = false;
    createDrawnNumbersGrid();
}

// Crear grid de números cantados organizado por filas BINGO
function createDrawnNumbersGrid() {
    drawnNumbersGrid.innerHTML = '';
    
    const activeColumns = GAME_TYPES[currentGameType].columns;
    
    // Crear una fila por cada letra activa
    activeColumns.forEach(col => {
        let start, end;
        switch(col) {
            case 'B': start = 1; end = 15; break;
            case 'I': start = 16; end = 30; break;
            case 'N': start = 31; end = 45; break;
            case 'G': start = 46; end = 60; break;
            case 'O': start = 61; end = 75; break;
        }
        
        // Crear fila
        const row = document.createElement('div');
        row.className = 'bingo-row';
        
        // Agregar letra
        const letter = document.createElement('div');
        letter.className = 'bingo-letter';
        letter.textContent = col;
        row.appendChild(letter);
        
        // Agregar números de esa fila
        for (let i = start; i <= end; i++) {
            const cell = document.createElement('div');
            cell.className = 'drawn-number';
            cell.textContent = i;
            cell.dataset.number = i;
            row.appendChild(cell);
        }
        
        drawnNumbersGrid.appendChild(row);
    });
}

// Obtener color según columna BINGO
function getBallColor(num) {
    if (num >= 1 && num <= 15) return 'ball-b';
    if (num >= 16 && num <= 30) return 'ball-i';
    if (num >= 31 && num <= 45) return 'ball-n';
    if (num >= 46 && num <= 60) return 'ball-g';
    if (num >= 61 && num <= 75) return 'ball-o';
    return '';
}

// Obtener letra BINGO según número
function getBingoLetter(num) {
    if (num >= 1 && num <= 15) return 'B';
    if (num >= 16 && num <= 30) return 'I';
    if (num >= 31 && num <= 45) return 'N';
    if (num >= 46 && num <= 60) return 'G';
    if (num >= 61 && num <= 75) return 'O';
    return '';
}

// Sacar una bola
function drawBall() {
    if (availableNumbers.length === 0) {
        cantoDisplay.textContent = '🎉 ¡Juego completado! Todas las bolas han sido cantadas';
        drawBtn.disabled = true;
        return;
    }

    // Animación de la bola girando
    currentBall.classList.add('drawing');
    drawBtn.disabled = true;

    setTimeout(() => {
        // Seleccionar número aleatorio
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const num = availableNumbers[randomIndex];
        
        // Remover de disponibles y agregar a cantados
        availableNumbers.splice(randomIndex, 1);
        drawnNumbers.push(num);

        // Actualizar bola actual
        ballNumber.textContent = num;
        const colorClass = getBallColor(num);
        currentBall.className = `ball ${colorClass} drawn`;
        
        // Mostrar canto
        const canto = CANTOS_TICOS[num] || `El ${num}`;
        const letra = getBingoLetter(num);
        cantoDisplay.innerHTML = `<strong>${letra}-${num}</strong><br>${canto}`;

        // Marcar en grid de números cantados
        const drawnCell = drawnNumbersGrid.querySelector(`[data-number="${num}"]`);
        if (drawnCell) {
            drawnCell.classList.add('drawn');
        }

        // Actualizar contador
        ballCount.textContent = `${drawnNumbers.length}/${totalNumbers}`;

        // Remover animación
        currentBall.classList.remove('drawing');
        drawBtn.disabled = false;

        // Vibración en móviles
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }, 800);
}

// Event listeners
drawBtn.addEventListener('click', drawBall);

// Mostrar modal al hacer click en Nuevo Juego
resetBtn.addEventListener('click', () => {
    gameModal.classList.add('show');
});

// Manejar selección de juego - usar event delegation
gameModal.addEventListener('click', (e) => {
    const gameOption = e.target.closest('.game-option');
    if (gameOption) {
        currentGameType = gameOption.dataset.game;
        gameModal.classList.remove('show');
        initGame();
    } else if (e.target === gameModal) {
        // Cerrar modal al hacer click fuera
        gameModal.classList.remove('show');
    }
});

// Prevenir zoom con gestos
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

// Prevenir doble tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Inicializar al cargar
initGame();
