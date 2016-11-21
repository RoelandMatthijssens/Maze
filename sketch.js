var world;
var current;
var unvisitedNeighbors = [];
function setup() {
    world = World(50,50,10);
    createCanvas(world.rows*world.scl, world.cols*world.scl);
    world.populateCells();
    current = world.visitRandomCell();
    current.hilight = true;
    frameRate(120);
}

function draw() {
    background(world.backgroundColor);
    world.render();
    var next = getRandomNeighbor();
    if(next){
        next.visited = true;
        unvisitedNeighbors.push(current);
        current.onStack = true;
        next.hilight = true;
        current.removeWallTo(next);
        current.hilight = false;
        current = next;
    } else if(unvisitedNeighbors.length > 0){
        current.hilight = false;
        current = unvisitedNeighbors.pop();
        current.hilight = true;
        current.onStack = false
    }
}

function getRandomNeighbor(){
    var neighbors = world.getNeighbors(current);
    var unvisitedNeighbors = neighbors.filter(function(cell){return !cell.visited});
    if(unvisitedNeighbors.length > 0){
        var r = floor(random(0, unvisitedNeighbors.length));
        return unvisitedNeighbors[r]
    } else {
        return undefined;
    }
}
