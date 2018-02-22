// constant
var SPEED = 10;

// playground setup
var playground = document.getElementById('playground');
playground.setAttribute('style', 'width: 500px; height: 500px; top: 0; border: 1px solid white');

// dead cells
var deadCells = [];

function deadCell(_size, _x, _y) {
    this.size = _size;
    this.color = '#4A494F';
    this.x = _x;
    this.y = _y;
    this.e = document.createElement('div');
    this.display = function () {
        this.e.setAttribute('style',
            'position: absolute;' +
            'z-index: 0;' +
            'width: '+ this.size +'px;' +
            'height: '+ this.size +'px;' +
            'margin: '+ this.x +'px '+ this.y +'px;' +
            'background-color: '+ this.color);
        playground.appendChild(this.e);
    }
}

// entity object
function entity(_id, _name, _size) {
    this.id = _id;
    this.name = _name;
    this.size = _size;
    this.direction = 0;
    this.color = '#ABDA94';
    this.x = Math.floor(Math.random() * playground.offsetWidth);
    this.y = Math.floor(Math.random() * playground.offsetHeight);
    this.e = document.createElement('div');
    this.display = function () {
        this.e.setAttribute('style',
            'position: absolute;' +
            'z-index: 1000;' +
            'width: '+ this.size +'px;' +
            'height: '+ this.size +'px;' +
            'margin: '+ this.x +'px '+ this.y +'px;' +
            'background-color: '+ this.color);
        playground.appendChild(this.e);
    };
    this.path = [];
    this.drawPath = function () {
        console.log(this.size)
        this.path.push({x: this.x, y: this.y, s: this.size});

        this.path.forEach(function(d) {
            console.log(d);
            var e = new deadCell(d.s, d.x, d.y);
            e.display()
        });

        console.log(this.path);
    }
}

// move
function move(_entity) {
    setInterval(function(){

        // 4 directions
        function right(){
            _entity.x += SPEED;
        }
        function left(){
            _entity.x -= SPEED;
        }
        function up(){
            _entity.y -= SPEED;
        }
        function down(){
            _entity.y += SPEED;
        }

        _entity.direction = Math.floor(Math.random() * 4);
        if(_entity.direction == 0){
            up();
        } else if(_entity.direction == 1){
            right();
        } else if(_entity.direction == 2){
            down();
        } else if(_entity.direction == 3){
            left();
        }

        // set playground collision
        if(_entity.x <= 0){
            _entity.x = 0;
        } else if(_entity.x + SPEED >= playground.offsetWidth){
            _entity.x = playground.offsetWidth - _entity.size;
        } else if(_entity.y <= 0){
            _entity.y = 0;
        } else if(_entity.y + SPEED >= playground.offsetHeight){
            _entity.y = playground.offsetHeight - _entity.size;
        }

        // display
        _entity.display();
        _entity.drawPath();
    }, 10);
}

var i=0;
for(i;i<1;i++){
    move(new entity(0, '0', 10));
}