var vec = {};

vec.vec2d = function (x, y) {
  this.x = x;
  this.y = y;
}

vec.vec2d.prototype.Plus = function(v) {
  this.x += v.x;
  this.y += v.y;
}

vec.DistSquared = function(p1, p2) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

vec.vec2d.prototype.MoveTowards = function(dest, dist) {
  if (vec.DistSquared(this, dest) <= dist * dist) {
    this.x = dest.x;
    this.y = dest.y;
    return;
  }
  var x_dist = Math.abs(dest.x - this.x);
  var y_dist = Math.abs(dest.y - this.y);
  if ((x_dist + y_dist) < 0.1) {
    window.console.log("bla");
  }
  var x_pct = x_dist / (x_dist + y_dist);
  if (this.x < dest.x) {
    this.x += x_pct * dist;
  } else {
    this.x -= x_pct * dist;
  }
  if (this.y < dest.y) {
    this.y += (1 - x_pct) * dist;
  } else {
    this.y -= (1 - x_pct) * dist;
  }
}
