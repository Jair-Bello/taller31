let X_MIN = 100,
    Y_MIN = 100,
    X_MAX = 300,
    Y_MAX = 300;
const canvas = document.getElementById('canvasClip');
const ctx = canvas.getContext('2d');

function dibujarViewport() {
    ctx.strokeStyle = "#7f8c8d";
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
    ctx.setLineDash([]);
}

dibujarViewport();

function dibujarLinea(x1, y1, x2, y2, color, ancho) {
    ctx.beginPath();
    ctx.lineWidth = ancho;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Prueba manual
dibujarLinea(50, 50, 350, 350, "blue", 1);