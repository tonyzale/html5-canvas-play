function Soccer(ctx) {
  this.players = [];
  this.ctx = ctx;
  this.players.push(new player(new point(50, 50)));
  this.players.push(new player(new point(100, 50)));
  this.players.push(new player(new point(150, 50)));
  this.timestamp = null;
  this.soccer = this;
  window.requestAnimationFrame(function(ts) { soccer.timestamp = ts; })

  function point(x, y) {
    this.x = x;
    this.y = y;
  }

  function player(loc) {
    this.location = loc;
    this.color = "green";
    this.rotation = 0;
  }
}

Soccer.prototype.MainLoop = function(ts) {
  var step = ts - this.timestamp;
  this.timestamp = ts;

  // game logic
  this.players.forEach(function(p) {
    p.location.y += step / 160.0;
    p.rotation += step / 160.0;
  });

  // render logic
  var ctx = this.ctx;
  ctx.clearRect(0, 0, 200, 200);
  this.players.forEach(function(p) {
    ctx.fillStyle = p.color;
    var PLAYER_SIZE = 5;
    ctx.translate(p.location.x, p.location.y);
    ctx.rotate(p.rotation);
    ctx.fillRect(-PLAYER_SIZE*0.5, -PLAYER_SIZE*0.5, PLAYER_SIZE, PLAYER_SIZE);
    ctx.rotate(-p.rotation);
    ctx.translate(-p.location.x, -p.location.y);
  });

  // request next frame
  var soccer = this;
  window.requestAnimationFrame(function(ts){soccer.MainLoop(ts)});
}

window.onload = function() {
  var soccer = new Soccer(document.getElementById("field").getContext("2d"));
  window.requestAnimationFrame(function(step){soccer.MainLoop(step)});
}
