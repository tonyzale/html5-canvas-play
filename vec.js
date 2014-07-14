var vec = {};

vec.vec2d = function (x, y) {
  this.x = x;
  this.y = y;
}

vec.vec2d.prototype.IPPlus = function(v) {
  this.x += v.x;
  this.y += v.y;
}

vec.vec2d.prototype.IPMult = function(k) {
  this.x *= k;
  this.y *= k;
}

vec.vec2d.prototype.Inv = function() {
  return new vec.vec2d(-this.x, -this.y);
}

vec.vec2d.prototype.Norm = function() {
  var mag = this.Len();
  return new vec.vec2d(this.x / mag, this.y / mag);
}

vec.vec2d.prototype.Len = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}

vec.vec2d.prototype.IPApplyVelocity = function(v, step) {
  this.x += (v.x * step);
  this.y += (v.y * step);
}

vec.vec2d.prototype.IPApplyDrag = function(d, step) {
  if (this.x == 0 && this.y == 0) return;
  var drag_vec = this.Norm();
  drag_vec.IPMult(-d * step);
  if ((Math.abs(drag_vec.x) > Math.abs(this.x)) ||
      (Math.abs(drag_vec.y) > Math.abs(this.y))) {
    this.x = 0; this.y = 0; return;
  }
  this.IPPlus(drag_vec);
}

vec.DistSquared = function(p1, p2) {
  return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

vec.vec2d.prototype.IPMoveTowards = function(dest, dist) {
  if (vec.DistSquared(this, dest) <= dist * dist) {
    this.x = dest.x;
    this.y = dest.y;
    return;
  }
  var x_dist = Math.abs(dest.x - this.x);
  var y_dist = Math.abs(dest.y - this.y);

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

vec.vec2d.prototype.str = function() {
  return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
}
