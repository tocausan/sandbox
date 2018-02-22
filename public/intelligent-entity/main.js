'use strict';

// constant
var ENTITY = 1;
var SPEED = 10;
var DISPLAY = 100;
var CONSOLE = true;
var GAMEOVER = false;

var svgNS = "http://www.w3.org/2000/svg";


// playground setup
var gameContainer = document.getElementById('game-container');
var playground = document.getElementById('playground');

// set playground
function setPlayground() {
    playground.setAttribute('width', gameContainer.offsetWidth);
    playground.setAttribute('height', gameContainer.offsetHeight);
    playground.setAttribute('style', 'border: 1px solid white');
}
setPlayground();

window.onresize = function () {
    setPlayground();
};

// dead cells
var deadCells = [];

function deadCell(_size, _x, _y) {
    this.size = _size;
    this.color = '#4A494F';
    this.x = _x;
    this.y = _y;
    this.e = document.createElementNS(svgNS,'rect');
    this.display = function () {
        this.e.setAttribute('class', 'deadcell');
        this.e.setAttribute('width', this.size);
        this.e.setAttribute('height', this.size);
        this.e.setAttribute('x', this.x);
        this.e.setAttribute('y', this.y);
        this.e.setAttribute('fill', this.color);
        this.e.setAttribute('style', 'z-index: 0');
        playground.appendChild(this.e);
    }
}


// entity object
function entity(_id, _name, _size) {
    console.log(playground.clientWidth)
    //this.id = _id;
    //this.name = _name;
    this.size = _size;
    this.direction = 0;
    this.move = true;
    this.collision = 0;
    this.color = '#ABDA94';
    this.x = Math.floor(Math.random() * playground.clientWidth);
    this.y = Math.floor(Math.random() * playground.clientHeight);
    this.px = null;
    this.py = null;
    this.e = document.createElementNS(svgNS,'rect');
    this.display = function () {
        if(this.move){
            this.e.setAttribute('class', 'entity');
            this.e.setAttribute('width', this.size);
            this.e.setAttribute('height', this.size);
            this.e.setAttribute('x', this.x);
            this.e.setAttribute('y', this.y);
            this.e.setAttribute('fill', this.color);
            this.e.setAttribute('style', 'z-index: 1000');
            playground.appendChild(this.e);
        }
    };
    this.path = [];
    this.drawPath = function () {
        if(this.move){
            this.path.push({x: this.x, y: this.y, s: this.size});
            deadCells.push({x: this.x, y: this.y, s: this.size});

            var e = new deadCell(this.size, this.px, this.py);
            e.display();
        }
    }
}


// choose direction
function chooseDirection(_entity) {
    var direction = Math.floor(Math.random() * 4);
    var directionList = [];

    // get random direction
    do {
        // check random list
        for (var i = 0; i < directionList.length; i++) {
            if (direction == directionList[i]) {
                console.log('random already taken');
                direction = null;
            }
        }
    } while (direction == null);

    // add direction to list
    directionList.push(direction);

    // return
    _entity.direction = direction;
    return _entity;
}


// find collision
function findCollision(_entity) {
    var futurePosition;
    _entity.move = true;

    // define future position
    switch (_entity.direction) {
        case 0:
            futurePosition = {
                x: _entity.x,
                y: _entity.y - _entity.size
            };
            break;
        case 1:
            futurePosition = {
                x: _entity.x + _entity.size,
                y: _entity.y
            };
            break;
        case 2:
            futurePosition = {
                x: _entity.x,
                y: _entity.y + _entity.size
            };
            break;
        case 3:
            futurePosition = {
                x: _entity.x - _entity.size,
                y: _entity.y
            };
            break;
    }

    // set deadcell collision
    for (var i = 0; i < deadCells.length; i++) {
        if (deadCells[i].x == futurePosition.x
            && deadCells[i].y == futurePosition.y) {
            console.log('deadcell collision');
            _entity.move = false;
            _entity.collision++
        }
    }

    // set playground collision
    if ((futurePosition.x <= 0)
        || (futurePosition.y <= 0)
        || (futurePosition.x + SPEED >= playground.offsetWidth)
        || (futurePosition.y + SPEED >= playground.offsetHeight)) {
        console.log('playground collision');
        _entity.move = false;
        _entity.collision++
    }

    if(_entity.collision > 20){
        deadCells = [];
        var z = document.getElementsByClassName("deadcell");
        for(var i=0; i<z.length; i++){
            z[i].setAttribute('fill', '#DAFFC8')
        }
    }

    // return
    if(_entity.move){
        _entity.collision = 0;
        _entity.px = _entity.x;
        _entity.py = _entity.y;
        _entity.x = futurePosition.x;
        _entity.y = futurePosition.y;
    }
    return _entity;

}

// move
function move(_entity){


    setInterval(function(){

        if(!GAMEOVER){
            chooseDirection(_entity);
            console.log(_entity);
            findCollision(_entity);

            // display
            _entity.display();
            _entity.drawPath();
        }


    }, DISPLAY);
}



var i=0;
for(i;i<ENTITY;i++){
    move(new entity(0, '0', 10));
}