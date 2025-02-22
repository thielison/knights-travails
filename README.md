# Knight's Travails

A JavaScript solution to the "Knight's Travails" assignment from [The Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails). This project finds the shortest path a knight can take on a standard 8x8 chess board from a given starting position to a target position.

## Overview

The solution leverages a Breadth-First Search (BFS) algorithm to explore all possible knight moves from the starting square until it finds the target square. Along the way, it keeps track of the number of moves taken and reconstructs the path once the destination is reached.

## How It Works

-   **Board Representation:**  
    An 8x8 chess board is created using a 2D array. Positions are represented with row and column indices (0-indexed).

-   **BFS Algorithm:**  
    The algorithm uses a queue to explore each cell reachable by the knight in an expanding "wave." It tracks each move until the target is reached.

-   **Tracking Moves and Path:**  
    A separate 2D array (`distance`) stores the number of moves needed to reach each cell. A `prev` map records the previous cell for each visited cell, enabling the reconstruction of the full path from the start to the destination.

-   **Path Reconstruction:**  
    Once the target is reached, the code backtracks using the `prev` map to build the sequence of moves, reverses the path (since it’s built backwards), and prints out both the move count and the path.

## Usage

Simply call the `knightMoves` function with two parameters:

-   **start:** An array representing the starting cell (e.g., `[0, 0]`).
-   **end:** An array representing the target cell (e.g., `[3, 3]`).

For example:

```js
knightMoves([0, 0], [3, 3]);
// Expected output: You made it in 2 moves! Here's your path:
// [[0, 0], [2, 1], [3, 3]]
```

```js
knightMoves([3, 3], [0, 0]);
// Expected output: You made it in 2 moves! Here's your path:
// [[3, 3], [1, 2], [0, 0]]
```

## Notes

-   Coordinates: All positions are zero-indexed (i.e., [0, 0] is the top-left corner).
-   Output: The function logs the result to the console, showing both the number of moves and the actual path.
-   Edge Cases: If the target is unreachable (which is highly unlikely on a standard chess board), the function returns -1.
