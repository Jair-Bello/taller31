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