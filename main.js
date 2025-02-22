// Find the shortest Knight path from start to end in the chess board
const knightMoves = (start, end) => {
    // Number of rows and columns of the chess board
    const rows = 8;
    const cols = 8;

    // Create an 8 x 8 chess board filled with zeros
    const board = Array.from({ length: rows }, () => Array(cols).fill(0));
    // Create a visited array to mark cells we've already checked
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    // Create an array to store the number of moves (distance) to each cell
    const distance = Array.from({ length: rows }, () => Array(cols).fill(0));

    board[end[0]][end[1]] = "END"; // Mark the target cell with "END"
    visited[start[0]][start[1]] = true; // Mark the start cell as visited
    distance[start[0]][start[1]] = 0; // Initialize distance with 0

    // prettier-ignore
    // All 8 possible L-shaped moves of a knight
    const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], 
                   [1, 2], [1, -2], [-1, 2], [-1, -2],];

    const queue = [start]; // Initialize the queue with the starting cell -> queue.push(start);
    let prev = new Map(); // This will record the previous cell for each visited cell (for path reconstruction)

    while (queue.length > 0) {
        // Dequeue the first cell in the queue and extract its coordinates
        const [x, y] = queue.shift();

        // Check if the current cell is the destination
        if (board[x][y] === "END") {
            // Reconstruct the path from end to start
            let path = [];
            let currKey = `${x},${y}`;
            while (currKey) {
                const [currX, currY] = currKey.split(",").map(Number);
                path.push([currX, currY]);
                currKey = prev.get(currKey);
            }
            path.reverse();

            console.log(`You made it in ${distance[x][y]} moves! Here's your path:`);
            console.log(path);

            return;
        }

        // Try all possible knight moves from the current cell
        for (let [dx, dy] of moves) {
            let newX = x + dx;
            let newY = y + dy;

            // Check that new coordinates are on the board (are valid) and haven't been visited
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !visited[newX][newY]) {
                queue.push([newX, newY]); // Add the new cell to the queue
                visited[newX][newY] = true; // Mark the cell as visited
                distance[newX][newY] = distance[x][y] + 1; // Update the move count
                prev.set(`${newX},${newY}`, `${x},${y}`); // Record where we came from
            }
        }
    }

    // If the queue empties and the destination was never reached, the function returns -1
    // as an indicator of failure (which is unlikely on a standard chessboard)
    return -1;
};

knightMoves([0, 0], [3, 3]); // == [[0,0],[2,1],[3,3]] or knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
knightMoves([3, 3], [0, 0]); // == [[3,3],[2,1],[0,0]] or knightMoves([3,3],[0,0]) == [[3,3],[1,2],[0,0]]
knightMoves([0, 0], [7, 7]); // == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]] or knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]
