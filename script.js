let X_MIN = 100,
    Y_MIN = 100,
    X_MAX = 300,
    Y_MAX = 300;
const canvas = document.getElementById('canvasClip');
const ctx = canvas.getContext('2d');

const INSIDE = 0; // 0000
const LEFT = 1; // 0001
const RIGHT = 2; // 0010
const BOTTOM = 4; // 0100
const TOP = 8; // 1000

function dibujarViewport() {
    ctx.strokeStyle = "#7f8c8d";
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(X_MIN, Y_MIN, X_MAX - X_MIN, Y_MAX - Y_MIN);
    ctx.setLineDash([]);
}

function calcularCodigo(x, y) {
    let codigo = INSIDE;
    if (x < X_MIN) codigo |= LEFT;
    else if (x > X_MAX) codigo |= RIGHT;
    if (y < Y_MIN) codigo |= BOTTOM;
    else if (y > Y_MAX) codigo |= TOP;
    return codigo;
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