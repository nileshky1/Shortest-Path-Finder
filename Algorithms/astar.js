function heuristic1(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  dx = Math.abs(dx);
  dy = Math.abs(dy);

  return dx + dy;
}
function point1(i, j, wall) {
  this.x = i;
  this.y = j;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.parent = null;

  this.wall = wall;


}
function findneighbours1(point, grid) {
  var i = point.x;
  var j = point.y;

  var neighbours = [];

  if (i > 0 && grid[i - 1][j].wall == 0) {
    neighbours.push(grid[i - 1][j]);
  }
  if (i < c - 1 && grid[i + 1][j].wall == 0) {
    neighbours.push(grid[i + 1][j]);
  }
  if (j < r - 1 && grid[i][j + 1].wall == 0) {
    neighbours.push(grid[i][j + 1]);
  }
  if (j > 0 && grid[i][j - 1].wall == 0) {
    neighbours.push(grid[i][j - 1]);
  }
  return neighbours;
}
function Astar(given, start_i, start_j, end_i, end_j) {
  open = [];
  close = [];
  c = given.length;
  r = given[0].length;
  var grid = new Array(c);

  for (var i = 0; i < c; i++) {

    grid[i] = new Array(r);
  }

  for (var i = 0; i < c; i++) {
    for (var j = 0; j < r; j++) {
      grid[i][j] = new point1(i, j, given[i][j]);
    }
  }

  var start = grid[start_i][start_j];
  var end = grid[end_i][end_j];

  open.push(start);

  while (open.length > 0) {
    var lowest = 0;
    for (var i = 0; i < open.length; i++) {
      if (open[i].f < open[lowest].f) {
        lowest = i;
      }
    }

    var current = open[lowest];

    if (current === end) {
      path = [];

      var temp = current;

      while (temp.parent) {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }

      path.push([start.x, start.y]);
      path.reverse();

      return path;
    }
    else {
      const index = open.indexOf(current);
      open.splice(index, 1);
      close.push(current);

      var neighbours = findneighbours1(current, grid);

      for (var i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];
        if (!close.includes(neighbour)) {
          var temp = current.g + 1;
          if (open.includes(neighbour)) {
            if (temp < neighbour.g) {
              neighbour.g = temp;
            }
          } else {
            neighbour.g = temp;
            open.push(neighbour);
          }
          neighbour.h = heuristic1(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;

          neighbour.parent = current;
        }
      }
    }
  }
  return [];
}