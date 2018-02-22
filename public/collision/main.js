

window.addEventListener('load', function () {

    var canvas = document.getElementById('canvas');

    if (!canvas || !canvas.getContext) {
        console.log("!canvas || !canvas.getContext");
        return;
    }

    ctx = canvas.getContext('2d');

    if (!ctx) {
        console.log("!ctx");
        return;
    }

    setInterval(refreshGame, 1);


}, false);


/* —————————————————————————————————————————————————— zone */
var zone ={

    minX:	0,
    maxX:	canvas.width,
    minY:	0,
    maxY:	canvas.height

}
/* —————————————————————————————————————————————————— zone */
/* —————————————————————————————————————————————————— balle */

var balle ={

    r:			2,
    x:			2,
    y:			2,
    xdir:		Math.floor(Math.random() * 50) + 1,
    ydir:		Math.floor(Math.random() * 50) + 1,
    speed:		Math.floor(Math.random() * 1) + .05,
    color:		"rgba("+Math.floor(Math.random() * 50) + 1+", "+Math.floor(Math.random() * 50) + 1+", "+Math.floor(Math.random() * 50) + 1+", 1)",


    affichage:		function(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fill()
    },

    info: 			function(){
        console.log(
            "balle.info()\n" +
            "balle.x		: "	+ this.x  		+ "\n" +
            "balle.y		: " + this.y 		+ "\n" +
            "balle.r		: " + this.r 		+ "\n" +
            "balle.xdir	: " 	+ this.xdir 	+ "\n" +
            "balle.ydir	: " 	+ this.ydir 	+ "\n" +
            "balle.speed	: " + this.speed 	+ "\n" +
            "balle.color	: " + this.color 	+ "\n"
        )
    },

    deplacement:	function(){
        this.x += this.xdir * this.speed
        this.y += this.ydir * this.speed
    },

    collisionBord:	function(){

        if	((this.x += this.xdir * this.speed)+balle.r >=  zone.maxX) 	this.xdir = -this.xdir
        if	((this.x += this.xdir * this.speed)-balle.r <=  zone.minX)	this.xdir = -this.xdir
        if	((this.y += this.ydir * this.speed)+balle.r >=  zone.maxY) 	this.ydir = -this.ydir
        if	((this.y += this.ydir * this.speed)-balle.r <=  zone.minY)	this.ydir = -this.ydir
    },

    clearContext:	function(){
        ctx.clearRect(0, 500, 0, 500)
    }

}
/* —————————————————————————————————————————————————— balle */



function refreshGame() {

    balle.info()
    balle.affichage()
    balle.deplacement()
    balle.collisionBord()
    balle.clearContext()

}

