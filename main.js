// Number of rows and columns of the chess board
const ROWS = 8;
const COLS = 8;

// Find the shortest Knight path from start to end in the chess board
const knightMoves = (start, end) => {
    // Create an 8 x 8 chess board filled with zeros
    const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    // Create a visited array to mark cells we've already checked
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    // Create an array to store the number of moves (distance) to each cell
    const distance = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    board[end[0]][end[1]] = "END"; // Mark the target cell with "END"
    visited[start[0]][start[1]] = true; // Mark the start cell as visited
    distance[start[0]][start[1]] = 0; // Initialize distance with 0

    // prettier-ignore
    // All 8 possible L-shaped moves of a knight
    const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], 
                   [1, 2], [1, -2], [-1, 2], [-1, -2]];

    const queue = [start]; // Initialize the queue with the starting cell -> queue.push(start);
    let prev = new Map(); // This will record the previous cell for each visited cell (for path reconstruction)

    while (queue.length > 0) {
        // Dequeue the first cell in the queue and extract its coordinates
        const [x, y] = queue.shift();

        // Check if the current cell is the destination
        if (board[x][y] === "END") {
            // Reconstruct the path from end to start

            // Create an empty array to hold the path
            let path = [];

            // Start at the target cell, using its string key (for example, "3,3")
            let currentKey = `${x},${y}`;

            // Continue looping as long as currentKey has a value
            while (currentKey !== undefined) {
                // Split the key string into two parts: row and column
                // e.g., "3,3" becomes ["3", "3"]
                let parts = currentKey.split(",");

                // Convert these string values into numbers
                let row = Number(parts[0]);
                let col = Number(parts[1]);

                // Add this coordinate (as an array) to our path list
                path.push([row, col]);

                // Update currentKey by getting the previous cell's key from the 'prev' map
                // For example, if currentKey is "3,3" and prev has "3,3" -> "2,1",
                // then currentKey becomes "2,1" in the next iteration.
                currentKey = prev.get(currentKey);
            }

            // The path array is built from target to start, so reverse it to get the correct order
            path.reverse();

            // Return an object with the distance and the path
            return { distance: distance[x][y], path };
        }

        // Try all possible knight moves from the current cell
        for (let [dx, dy] of moves) {
            let newX = x + dx;
            let newY = y + dy;

            // Check that new coordinates are on the board (are valid) and haven't been visited
            if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLS && !visited[newX][newY]) {
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

// Example calls
const test1 = knightMoves([0, 0], [3, 3]);
console.log(`You made it in ${test1.distance} moves! Here's your path:`);
console.log(test1.path);

const test2 = knightMoves([3, 3], [0, 0]);
console.log(`You made it in ${test2.distance} moves! Here's your path: `);
console.log(test2.path);

const test3 = knightMoves([0, 0], [7, 7]);
console.log(`You made it in ${test3.distance} moves! Here's your path:`);
console.log(test3.path);
