// set time
$(document).ready(function () {
    setInterval(function () {
        var second = new Date().getSeconds();
        var secdegree = second * 6;
        var secrotate = "rotate(" + secdegree + "deg)";
        $("#secs").css({"-moz-transform": secrotate, "-webkit-transform": secrotate});
    }, 50);
    setInterval(function () {
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        var hourdegree = hour * 30 + (mins / 2);
        var hourrotate = "rotate(" + hourdegree + "deg)";
        $("#hours").css({"-moz-transform": hourrotate, "-webkit-transform": hourrotate});
    }, 1000);
    setInterval(function () {
        var min = new Date().getMinutes();
        var mindegree = min * 6;
        var minrotate = "rotate(" + mindegree + "deg)";
        $("#mins").css({"-moz-transform": minrotate, "-webkit-transform": minrotate});
    }, 1000);
});

// draw the clock
var square1 = document.getElementById("secs");
var ctxsquare1 = square1.getContext("2d");
ctxsquare1.fillStyle = "rgba(255,184,97,.6)";
ctxsquare1.beginPath();
ctxsquare1.moveTo(0, 0);

ctxsquare1.lineTo(0, 3000);
ctxsquare1.lineTo(3000, 3000);
ctxsquare1.lineTo(3000, 0);
ctxsquare1.lineTo(1600, 0);
ctxsquare1.lineTo(1600, 1500);
ctxsquare1.bezierCurveTo(1600, 1650, 1400, 1650, 1400, 1500);
ctxsquare1.lineTo(1400, 0);
ctxsquare1.lineTo(0, 0);
ctxsquare1.fill();

var square2 = document.getElementById("mins");
var ctxsquare2 = square2.getContext("2d");
ctxsquare2.fillStyle = "rgba(255,105,97,.6)";
ctxsquare2.beginPath();
ctxsquare2.moveTo(0, 0);
ctxsquare2.lineTo(0, 3000);
ctxsquare2.lineTo(3000, 3000);
ctxsquare2.lineTo(3000, 0);
ctxsquare2.lineTo(1600, 0);
ctxsquare2.lineTo(1600, 1500);
ctxsquare2.bezierCurveTo(1600, 1650, 1400, 1650, 1400, 1500);
ctxsquare2.lineTo(1400, 0);
ctxsquare2.lineTo(0, 0);
ctxsquare2.fill();

var square3 = document.getElementById("hours");
var ctxsquare3 = square3.getContext("2d");
ctxsquare3.fillStyle = "rgba(255,97,168,.6)";
ctxsquare3.beginPath();
ctxsquare3.moveTo(0, 0);
ctxsquare3.lineTo(0, 3000);
ctxsquare3.lineTo(3000, 3000);
ctxsquare3.lineTo(3000, 0);
ctxsquare3.lineTo(1600, 0);
ctxsquare3.moveTo(1600, 0);
ctxsquare3.lineTo(1600, 1500);
ctxsquare3.bezierCurveTo(1600, 1650, 1400, 1650, 1400, 1500);
ctxsquare3.lineTo(1400, 0);
ctxsquare3.lineTo(0, 0);
ctxsquare3.fill();
