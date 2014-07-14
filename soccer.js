var vec2d = vec.vec2d;

function Soccer(field) {
  this.players = [];

  var soccer = this;
  field.addEventListener('click', function(){soccer.click()});
  this.ctx = field.getContext("2d");
  var p = new player(new vec2d(50,50));
  this.players.push(p);
  this.players.push(new player(new vec2d(100, 50)));
  this.players.push(new player(new vec2d(150, 50)));
  this.timestamp = null;
  window.requestAnimationFrame(function(ts) { soccer.timestamp = ts; })
  this.WIDTH = field.width;
  this.HEIGHT = field.height;
  this.b = new ball(new vec2d(100,100));

  function ConstrainToField(p) {
    if (p.x < 0) p.x = 5;
    if (p.x > this.WIDTH) p.x = this.WIDTH - 10;
    if (p.y < 0) p.y = 5;
    if (p.y > this.WIDTH) p.y = this.HEIGHT - 10;
  }

  function player(loc) {
    this.location = loc;
    this.color = "green";
    this.rotation = 0;
    this.dest = new vec2d(50,50);
  }

  function ball(loc) {
    this.location = loc;
    this.vel = new vec2d(30,0);  // m/s
    this.DRAG = 1.5;  // 1.5m/s^2
  }

  ball.prototype.UpdatePos = function(step) {
    this.location.IPApplyVelocity(this.vel, step);
    this.vel.IPApplyDrag(this.DRAG, step);
  }
}

Soccer.prototype.click = function() {
  var that = this;
  this.players.forEach(function(p) {
    p.dest.x = getRandomInt(0, that.WIDTH);
    p.dest.y = getRandomInt(0, that.HEIGHT);
  });
}

Soccer.prototype.MainLoop = function(ts) {
  var step = ts - this.timestamp;
  step = 1.0 / 60.0;
  this.timestamp = ts;

  // game logic
  this.players.forEach(function(p) {
    p.location.IPMoveTowards(p.dest, 4);
  });
  this.b.UpdatePos(step);

  // render logic
  var ctx = this.ctx;
  ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
  this.players.forEach(function(p) {
    ctx.fillStyle = p.color;
    var PLAYER_SIZE = 10;
    ctx.translate(p.location.x, p.location.y);
    ctx.rotate(p.rotation);
    ctx.fillRect(-PLAYER_SIZE*0.5, -PLAYER_SIZE*0.5, PLAYER_SIZE, PLAYER_SIZE);
    ctx.rotate(-p.rotation);
    ctx.translate(-p.location.x, -p.location.y);
  });
  ctx.fillStyle = "black";
  ctx.translate(this.b.location.x, this.b.location.y);
  ctx.fillRect(-1, -1, 2, 2);
  ctx.translate(-this.b.location.x, -this.b.location.y);
  document.getElementById("debug").innerHTML = this.b.location.str() + " vel: " + this.b.vel.str();

  // request next frame
  var soccer = this;
  window.requestAnimationFrame(function(ts){soccer.MainLoop(ts)});
}

window.onload = function() {
  var soccer = new Soccer(document.getElementById("field"));
  window.requestAnimationFrame(function(step){soccer.MainLoop(step)});
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
