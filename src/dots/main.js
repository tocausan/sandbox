const animations = ['heart', 'ping', 'square', 'circle', 'wait'],
    timing = 100,
    panel = {
        x: 61,
        y: 10
    },
    matrix = [];

function animateDots(content) {
    text(content);
}

function setDots(content, x) {
    const matrix = getMatrix(content, x),
        active = 'active';

    Array.from(document.getElementsByClassName('dot-line')).forEach((dl, dy) => {
        Array.from(dl.getElementsByClassName('dot')).forEach((d, dx) => {
            if (d.classList.contains(active)) {
                d.classList.remove(active);
            }
            if (matrix[dy][dx]) {
                d.classList.add(active)
            }
        });
    })
}

function getTemplate(content) {
    // check code as [animationName]
    const matrix = [],
        regex = /\[([^[]+)\]|./g,
        decodedContent = content.match(regex);

    decodedContent.map(item => {
        const template = new Library().getTemplate(item.replace(/[\[\]']+/g, ''));
        matrix.push(template);
    });

    return matrix;
}

function getMatrix(content, x) {
    const template = getTemplate(content),
        xLength = (template[0][0].length * template.length) + template.length,
        yLength = template[0].length;

    let matrix = setMatrix(xLength, yLength);
    for (let i = 0; i < template.length; i++) {
        for (let j = 0; j < template[i].length; j++) {
            for (let k = 0; k < template[i][j].length; k++) {
                matrix[j][k + (i * template[0][0].length) + x] = template[i][j][k];
            }
        }
    }
    return matrix;
}

function setMatrix(x, y) {
    let matrix = [];
    for (let j = 0; j < y; j++) {
        let line = [];
        for (let k = 0; k < x; k++) {
            line.push(0);
        }
        matrix.push(line);
    }
    return matrix;
}

function setAll(matrix, b, pois) {
    let template = [];
    for (let i = 0; i < panel.y; i++) {
        let line = [];
        for (let j = 0; j < panel.x; j++) {
            if (pois) {
                if (i % 2 == 0) {
                    line.push(b)
                }
            } else {
                line.push(b);
            }
        }
        template.push(line);
    }
    return template;
}


function blink() {
    let s = true;
    setInterval(() => {
        setAll(s);
        status = !status;
    }, timing);
}


function text(content) {
    const template = getTemplate(content);
    const templateLength = template.length * template[0][0].length;
    let x = panel.x;

    setInterval(() => {
        setDots(content, x);
        x >= (0 - templateLength) ? x-- : x = panel.x;
    }, timing);
}

function getCondensedLibrary(content) {
    const matrix = getTemplate(content);
    let templateJoined = [];
    matrix.map(c => {
        let cJoined = [];
        c.map(x => {
            cJoined.push(x.join(''));
        });
        templateJoined.push(cJoined.join(''));
    });
    return templateJoined.join('|');
}

window.onload = () => {
    animateDots('abcdefghijklmnopqrstuvwxyz');
};