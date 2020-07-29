var Cell = function(x, y, scl){
  this.x = x;
  this.y = y;
  this.scl = scl;
  this.sclx = this.x*this.scl;
  this.scly = this.y*this.scl;
  this.visited = false;
  this.hilight = false;
  this.onStack = false;

  this.walls = [true, true, true, true];
  var N = 0,
    E = 1,
    S = 2,
    W = 3;

  this.removeWallTo = function removeWallTo(neighbor){
    var direction = this.getDirectionTo(neighbor);
    this.removeWall(direction);
    neighbor.removeWall(this.reverse(direction));
  };

  this.removeWall = function removeWall(direction){
    this.walls[direction] = false;
  };

  this.getReverseDict = function(){
    var d = {};
    d[E] = W;
    d[N] = S;
    d[S] = N;
    d[W] = E;
    return d;
  };

  this.reverse = function reverse(direction){
    return this.getReverseDict()[direction];
  };

  this.getDirectionTo = function getDirectionTo(neighbor){
    if(neighbor.x === this.x && neighbor.y < this.y)
      return N;
    if(neighbor.x > this.x && neighbor.y === this.y)
      return E;
    if(neighbor.x === this.x && neighbor.y > this.y)
      return S;
    if(neighbor.x < this.x && neighbor.y === this.y)
      return W;
  };

  this.show = function() {
    stroke(255);
    if (this.walls[N]){
      line(this.sclx, this.scly, this.sclx + this.scl, this.scly);
    }
    if (this.walls[E]){
      line(this.sclx + this.scl, this.scly, this.sclx + this.scl, this.scly + this.scl);
    }
    if (this.walls[S]){
      line(this.sclx, this.scly + this.scl, this.sclx + this.scl, this.scly + this.scl);
    }
    if (this.walls[W]){
      line(this.sclx, this.scly, this.sclx, this.scly + this.scl);
    }

    if(this.visited){
      noStroke();
      if(this.onStack) {
        fill(250, 0, 250, 100);
      } else {
        fill(200, 200, 200, 100);
      }
      rect(this.sclx, this.scly, this.scl, this.scl);
    }
    if(this.hilight){
      noStroke();
      fill(0,250,250);
      rect(this.sclx, this.scly, this.scl, this.scl);
    }
  };

  return this;
};
