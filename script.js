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

const casosPrueba = [
    { p1: { x: 20, y: 20 }, p2: { x: 80, y: 50 }, desc: "Fuera" },
    { p1: { x: 150, y: 150 }, p2: { x: 250, y: 250 }, desc: "Adentro" },
    { p1: { x: 50, y: 150 }, p2: { x: 200, y: 200 }, desc: "Parcial" },
    { p1: { x: 50, y: 150 }, p2: { x: 350, y: 250 }, desc: "Atraviesa" },
    { p1: { x: 80, y: 80 }, p2: { x: 100, y: 100 }, desc: "Esquina" }
];
let indiceActual = 0;

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

function cohenSutherland(x1, y1, x2, y2) {
    let code1 = calcularCodigo(x1, y1);
    let code2 = calcularCodigo(x2, y2);
    let accept = false;

    while (true) {
        if (!(code1 | code2)) {
            accept = true;
            break;
        } else if (code1 & code2) {
            break;
        } else {
            let x, y;
            let codeOut = code1 !== 0 ? code1 : code2;
            if (codeOut & TOP) {
                x = x1 + (x2 - x1) * (Y_MAX - y1) / (y2 - y1);
                y = Y_MAX;
            } else if (codeOut & BOTTOM) {
                x = x1 + (x2 - x1) * (Y_MIN - y1) / (y2 - y1);
                y = Y_MIN;
            } else if (codeOut & RIGHT) {
                y = y1 + (y2 - y1) * (X_MAX - x1) / (x2 - x1);
                x = X_MAX;
            } else if (codeOut & LEFT) {
                y = y1 + (y2 - y1) * (X_MIN - x1) / (x2 - x1);
                x = X_MIN;
            }
            if (codeOut === code1) {
                x1 = x;
                y1 = y;
                code1 = calcularCodigo(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                code2 = calcularCodigo(x2, y2);
            }
        }
    }
    return accept ? { x1, y1, x2, y2 } : null;
}


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarViewport();
    const data = casosPrueba[indiceActual];
    dibujarLinea(data.p1.x, data.p1.y, data.p2.x, data.p2.y, "#ddd", 1);
    const r = cohenSutherland(data.p1.x, data.p1.y, data.p2.x, data.p2.y);
    if (r) dibujarLinea(r.x1, r.y1, r.x2, r.y2, "red", 3);
}

function cambiarEscena(dir) {
    indiceActual = (indiceActual + dir + casosPrueba.length) % casosPrueba.length;
    render();
}

function actualizarVentana() {
    X_MIN = parseInt(document.getElementById('xmin').value);
    Y_MIN = parseInt(document.getElementById('ymin').value);
    X_MAX = parseInt(document.getElementById('xmax').value);
    Y_MAX = parseInt(document.getElementById('ymax').value);
    render();
}
render();