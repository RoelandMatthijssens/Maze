var World = function World(size, scl){
  this.rows = size;
  this.cols = size;
  this.scl = scl;
  this.height = this.rows*this.scl;
  this.width = this.cols*this.scl;
  this.backgroundColor = 51;
  this.foregroundColor = 255;
  this.cells = [];

  this.populateCells = function populateCells(){
    var cells = [];
    for(var y = 0; y < rows; y++){
      for(var x = 0; x < cols; x++){
        var cell = new Cell(x, y, this.scl);
        cells.push(cell);
      }
    }
    this.cells = cells;
  };

  this.render = function render(){
    for(var index in this.cells){
      var cell = this.cells[index];
      cell.show();
    }
  };

  this.visitRandomCell = function initRandomCell(){
    var cell = cells[Math.floor(Math.random()*this.cells.length)];
    cell.visited = true;
    return cell;
  };

  this.getNeighbors = function getNeighbors(cell){
    var coords = [
      [cell.x, cell.y-1],[cell.x+1, cell.y],  //north, south
      [cell.x, cell.y+1],[cell.x-1, cell.y]   //east, west
    ];
    var neighbors = coords.map(function(i){return getCell.apply(null, i)});
    return neighbors.filter(function(i){return i}); //filter out undefined cells
  };

  this.getCell = function getCell(x, y){
    var index = x+y*cols;
    if (x > cols-1 || x < 0 || y > rows-1 || y < 0) {
    } else {
      return this.cells[x + y * cols];
    }
  };

  return this;
};
