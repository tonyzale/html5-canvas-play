function Soccer(field) {
  this.players = [];
  var soccer = this;
  field.addEventListener('click', function(){soccer.click()});
  this.ctx = field.getContext("2d");
  this.players.push(new player(new point(50, 50)));
  this.players.push(new player(new point(100, 50)));
  this.players.push(new player(new point(150, 50)));
  this.timestamp = null;
  window.requestAnimationFrame(function(ts) { soccer.timestamp = ts; })

  function point(x, y) {
    this.x = x;
    this.y = y;
  }

  function DistSquared(p1, p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
  }

  point.prototype.moveTo = function(p, dist) {
    if (DistSquared(this, p) <= dist * dist) {
      this.x = p.x;
      this.y = p.y;
      return;
    }
    var x_dist = Math.abs(p.x - this.x);
    var y_dist = Math.abs(p.y - this.y);
    var x_pct = x_dist / (x_dist + y_dist);
    if (this.x < p.x) {
      this.x += x_pct * dist;
    } else {
      this.x -= x_pct * dist;
    }
    if (this.y < p.y) {
      this.y += (1 - x_pct) * dist;
    } else {
      this.y -= (1 - x_pct) * dist;
    }
 }

  function player(loc) {
    this.location = loc;
    this.color = "green";
    this.rotation = 0;
    this.dest = new point(50,50);
  }
}

Soccer.prototype.click = function() {
  this.players.forEach(function(p) {
    p.dest.x = getRandomInt(0,200);
    p.dest.y = getRandomInt(0,200);
  });
}

Soccer.prototype.MainLoop = function(ts) {
  var step = ts - this.timestamp;
  this.timestamp = ts;

  // game logic
  this.players.forEach(function(p) {
    p.location.moveTo(p.dest, 4);
  });

  // render logic
  var ctx = this.ctx;
  ctx.clearRect(0, 0, 200, 200);
  this.players.forEach(function(p) {
    ctx.fillStyle = p.color;
    var PLAYER_SIZE = 10;
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
  var soccer = new Soccer(document.getElementById("field"));
  window.requestAnimationFrame(function(step){soccer.MainLoop(step)});
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
