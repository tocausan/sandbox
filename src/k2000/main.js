// https://codepen.io/tocausan/pen/JbaJjN

const boardSet = {
        width: 10,
        height: 1
    },
    cell = {
        width: 20,
        height: 30,
        margin: 1
    },
    cZero = {
        x: 0,
        y: 1,
        s: 1
    };

function setBoard() {
    const svgns = 'http://www.w3.org/2000/svg',
        board = document.getElementsByClassName('board')[0];
    board.innerHTML = "";
    board.setAttributeNS(null, 'width', (boardSet.width + cell.margin) * cell.width);

    for (let i = 0; i < boardSet.height; i++) {
        for (let j = 0; j < boardSet.width; j++) {
            const r = document.createElementNS(svgns, 'rect');
            r.setAttributeNS(null, 'y', i * (cell.height + cell.margin));
            r.setAttributeNS(null, 'x', j * (cell.width + cell.margin));
            r.setAttributeNS(null, 'width', cell.width);
            r.setAttributeNS(null, 'height', cell.height);
            r.classList.add('cell')
            r.classList.add('cell_' + i + j)
            board.appendChild(r);
        }
    }
}

function cellMove(cells){
    if (cZero.y >= boardSet.width - 1) cZero.s = -cZero.s;
    if (cZero.y < 1) cZero.s = -cZero.s;

    cZero.y += cZero.s;

    cells.map((c) => {
        if (c.classList.contains('cell_' + cZero.x + cZero.y)) {
            c.classList.add('active');
        } else {
            if (c.classList.contains('active')) {
                c.classList.remove('active');
            }
        }
    });
}

(function animation() {
    setBoard();
    const cells = Array.from(document.getElementsByClassName('cell'));

    setInterval(() => {
        cellMove(cells);
    }, 60);
})();


