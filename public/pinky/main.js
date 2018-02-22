var deg = 0;

function rotate(elem, dir) {
    deg -= 1 * dir;
    var cx = $(elem).children().attr("cx");
    var cy = $(elem).children().attr("cy");

    $(elem).first().attr("transform", "rotate(" + deg + " " + cx + " " + cy + ")")
}

setInterval(function () {
    rotate("#frontwheel_1", 1);
    rotate("#rearwheel_1", 1);
}, 10);

