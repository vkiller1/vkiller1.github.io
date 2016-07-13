
window.onload = function(){  

	  var interval = 10; 
	  var canvas = document.getElementById('mycanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();
	  _ball = new Ball(canvas.Width,canvas.Height);  
      setInterval("update()",interval); 
      imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
      }
      imageObj.src = 'images.jpg';
}

function Rect() {
	this.isSelected = false;
	this.x = 0;
	this.y = 0;
	this.width = 1;
	this.height = 1;
	}
Rect.prototype.isContain = function(x,y){
		var right = this.x + this.width;
		var bottom = this.y + this.height;
		return x > this.x && x < right &&    y > this.y && y < bottom;
	}	

function ShapeList(){
	this.items = [];
	this.selectedItem = null;
	this.offsetX = -1;
	this.offsetY = -1;
	}  
ShapeList.prototype.addItem = function(x,y,width,height){
	var rect = new Rect;
	rect.x = x;
	rect.y = y;
	rect.width = width;
	rect.height = height;  
	this.items.push(rect);
	}  
ShapeList.prototype.selectAt = function(x,y){
	if(this.selectedItem)
		this.selectedItem.isSelected = false;
		this.selectedItem = null;
		for (var i = 0; i < this.items.length; i++) {
			var rect = this.items[i];
			if(rect.contains(x,y))   {
				this.selectedItem = this.items[i];
				this.offsetX = x - this.items[i].x;
				this.offsetY = y - this.items[i].y;
				this.items[i].isSelected = true;
				break;
					}
				}
			}

function draw(){
	clear();
	context.clearRect(0,0,_canvas.width,_canvas.height);
	_ball.draw(_context); 	
	for (var i = _list.items.length-1;i>=0; i--) {
		drawRect(_list.items[i]);
		}
	}  
function update(){
	_ball.move();
	_ball.checkCollision();
	draw();
} 
function drawRect(rect){
	_context.fillRect(rect.x,rect.y,rect.width,rect.height);
	if(rect.isSelected)  {
		_context.save();
		_context.strokeStyle = "red";
		_context.strokeRect(rect.x,rect.y,rect.width,rect.height);
		_context.restore();
		}
	} 	
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
       return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
        };
    }
function canvas_mousedown(e) {
	var x = e.pageX - _canvas.offsetLeft;
	var y = e.pageY - _canvas.offsetTop;
	_list.selectAt(x,y)
	if(!_list.selectedItem)
	_list.addItem(x-RECT_SIZE,y-RECT_SIZE,RECT_SIZE*2,RECT_SIZE*2);
	    _ismoving = true;
	    draw();
	  }
function canvas_mouseup (e){
	_ismoving = false;
	}
