const numberMatrix = '1110111|0010010|1011101|1011011|0111010|1101011|1101111|1010010|1111111|1111011|0000000',
    active = 'active';
let matrix = [];

getTime();


function getTime() {
    function getTwoDigitsString(n) {
        const digits = n.toString();
        return digits.length <= 1 ? '0' + digits : digits;
    }

    const numbers = numberMatrix.split('|');

    setInterval(() => {
        const date = new Date(),
            time = getTwoDigitsString(date.getFullYear()) + getTwoDigitsString(date.getMonth() + 1) + getTwoDigitsString(date.getDate()) + getTwoDigitsString(date.getHours()) + getTwoDigitsString(date.getMinutes()) + getTwoDigitsString(date.getSeconds());

        time.split('').forEach((a, i) => {
            matrix[i] = numbers[parseInt(a)];
            displayDigit(1);
        });

        displayDot(time, 1);
    }, 1000);
}


function displayDigit(bool) {
    matrix.forEach((a, i) => {
        const digit = document.getElementsByClassName('digit_' + i)[0];

        a.split('').forEach((b, j) => {
            const className = 'part_' + j;
            digit.getElementsByClassName(className)[0].classList.remove(active);

            if (parseInt(matrix[i].split('')[j])) {
                bool ?
                    digit.getElementsByClassName(className)[0].classList.add(active) :
                    digit.getElementsByClassName(className)[0].classList.remove(active);
            }
        });
    });
}

function displayDot(t, bool) {
    const dots = [document.getElementsByClassName('dot_0')[0], document.getElementsByClassName('dot_1')[0]],
        className = 'part_';

    dots.forEach(a => {
        for (let j = 0; j < a.childElementCount; j++) {
            a.getElementsByClassName(className + j)[0].classList.remove(active);
        }
    });

    if (t.split('')[2] % 2) {
        dots[0].getElementsByClassName(className + 0)[0].classList.add(active);
    }
    if (t.split('')[3] % 2) {
        dots[0].getElementsByClassName(className + 1)[0].classList.add(active);
    }
    if (t.split('')[4] % 2) {
        dots[1].getElementsByClassName(className + 0)[0].classList.add(active);
    }
    if (t.split('')[5] % 2) {
        dots[1].getElementsByClassName(className + 1)[0].classList.add(active);
    }
}