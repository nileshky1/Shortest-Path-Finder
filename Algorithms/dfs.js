function point4(i, j, wall) {
    this.x = i;
    this.y = j;

    this.parent = null;

    this.wall = wall;

}


function findneighbours4(point, grid) {
    var i = point.x;
    var j = point.y;

    var neighbours = [];

    if (i > 0 && grid[i - 1][j].wall == 1) {
        neighbours.push(grid[i - 1][j]);
    }
    if (j < r - 1 && grid[i][j + 1].wall == 1) {
        neighbours.push(grid[i][j + 1]);
    }
    if (i < c - 1 && grid[i + 1][j].wall == 1) {
        neighbours.push(grid[i + 1][j]);
    }
    if (j > 0 && grid[i][j - 1].wall == 1) {
        neighbours.push(grid[i][j - 1]);
    }
    return neighbours;
}


function DFS(given, start_i, start_j, end_i, end_j) {
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
            grid[i][j] = new point4(i, j, !given[i][j]);
        }
    }
    var start = grid[start_i][start_j];
    var end = grid[end_i][end_j];
    open.push(start);
    path = [];
    while (open.length > 0) {
        var current = open[open.length - 1];
        open.pop();
        path.push([current.x, current.y]);
        if (current === end) {
            path.reverse();
            return path;
        }
        else {
            close.push(current);
            var neighbours = findneighbours4(current, grid);
            for (var i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!close.includes(neighbour)) {
                    neighbour.parent = current;
                    open.push(neighbour);
                }
            }
        }
    }
    return [];
}
