/** @type HTMLCanvasElement */
const canvas = document.getElementById("chess-board");
/** @type CanvasRenderingContext2D */
const ctx = canvas.getContext("2d");
/** @type {{x:number, y:number}} */
const mousePos = { x: 0, y: 0 };
/**
 * @typedef {{name:string, pos:string, held:boolean}} Piece
 */
/** @type Piece[] */
let pieces = [
    { name: "wr", pos: "a1", held: false },
    { name: "wr", pos: "h1", held: false },
    { name: "wn", pos: "b1", held: false },
    { name: "wn", pos: "g1", held: false },
    { name: "wb", pos: "c1", held: false },
    { name: "wb", pos: "f1", held: false },
    { name: "wq", pos: "d1", held: false },
    { name: "wk", pos: "e1", held: false },
    { name: "wp", pos: "a2", held: false },
    { name: "wp", pos: "b2", held: false },
    { name: "wp", pos: "c2", held: false },
    { name: "wp", pos: "d2", held: false },
    { name: "wp", pos: "e2", held: false },
    { name: "wp", pos: "f2", held: false },
    { name: "wp", pos: "g2", held: false },
    { name: "wp", pos: "h2", held: false },

    { name: "br", pos: "a8", held: false },
    { name: "br", pos: "h8", held: false },
    { name: "bn", pos: "b8", held: false },
    { name: "bn", pos: "g8", held: false },
    { name: "bb", pos: "c8", held: false },
    { name: "bb", pos: "f8", held: false },
    { name: "bq", pos: "d8", held: false },
    { name: "bk", pos: "e8", held: false },
    { name: "bp", pos: "a7", held: false },
    { name: "bp", pos: "b7", held: false },
    { name: "bp", pos: "c7", held: false },
    { name: "bp", pos: "d7", held: false },
    { name: "bp", pos: "e7", held: false },
    { name: "bp", pos: "f7", held: false },
    { name: "bp", pos: "g7", held: false },
    { name: "bp", pos: "h7", held: false },
];
const { width } = canvas;
const tileSize = width / 8;
(function draw() {
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (i + j) % 2 == 0 ? "#fff" : "#BD8684"
            ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize); // draw checkerboard
            const squareName = "abcdefgh"[i] + String(8 - j);

            pieces.forEach(piece => {
                if (piece.held) {
                    ctx.drawImage(document.getElementById(piece.name), mousePos.x - tileSize / 2, mousePos.y - tileSize / 2, tileSize, tileSize);
                    return;
                }
                if (piece.pos === squareName) {
                    ctx.drawImage(document.getElementById(piece.name), i * tileSize, j * tileSize, tileSize, tileSize);
                }
            })
        }


    requestAnimationFrame(draw);
})();
canvas.addEventListener("mousemove", e => [mousePos.x, mousePos.y] = [e.x, e.y]);
canvas.addEventListener("mousedown", e => {
    const squareName = "abcdefgh"[Math.floor(e.x / tileSize)] + Math.floor(9 - e.y / tileSize);
    console.log(squareName);
    pieces.forEach(piece => {
        if (piece.pos == squareName) {
            piece.held = true;
        }
    });
});
canvas.addEventListener("mouseup", e => {
    const squareName = "abcdefgh"[Math.floor(e.x / tileSize)] + Math.floor(9 - e.y / tileSize);
    pieces.forEach(piece => {
        if (piece.held) {
            pieces = pieces.filter(piece => piece.pos != squareName); // remove piece that it will capture
            piece.pos = squareName;
            piece.held = false;
            return;
        }
    });
});