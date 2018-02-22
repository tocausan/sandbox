// https://codepen.io/tocausan/pen/gvWKwN

const animationTiming = 100,
    frames = document.getElementsByClassName('frames')[0];
let i = 1;

setInterval(() => {

    if (i > 5) i = 1;
    const frame = frames.getElementsByClassName('frame_' + i)[0],
        text = frames.getElementsByClassName('text_' + i)[0];
    frame.style.display = 'block';
    text.style.display = 'block';
    setTimeout(() => {
        frame.style.display = 'none';
        text.style.display = 'none';
    }, animationTiming);
    i++;
}, animationTiming);