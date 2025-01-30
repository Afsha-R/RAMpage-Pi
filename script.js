// Select the player and maze container
const player = document.getElementById("player");
const maze = document.getElementById("maze");
const exit = document.getElementById("exit");

// Set up the grid size (20x20 maze)
const gridSize = 20;
const cellSize = 100 / gridSize; // 100% / grid size for responsive cells

// Define the player's initial position in the grid (row and column)
let playerPosition = { x: 0, y: 0 };

// Define the exit position (bottom-right corner)
const exitPosition = { x: gridSize - 1, y: gridSize - 1 };

// Define walls in the maze (hardcoded for moderate difficulty)
const walls = [
    { x: 0, y: 1 }, { x: 2, y: 0 },{ x: 3, y: 0 },{ x: 4, y: 0 },  { x: 5, y: 1 }, { x: 5, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 0 }, { x: 8, y: 1 }, 
    { x: 11, y: 1},  { x: 13, y: 1},    { x: 18, y: 1 }, { x: 19, y: 0 },{ x: 7, y: 4 },{ x: 16, y: 0 },{ x: 17, y: 0 },{ x: 11, y: 0 },{ x: 10, y: 0 },{ x: 14, y: 0 },{ x: 17, y: 1 },

    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },   { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 }, 
    { x: 10, y: 2 },   { x: 15, y: 2 },   { x: 19, y: 2 },

    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 2, y: 3 },  { x: 4, y: 3 },  { x: 6, y: 3 }, { x: 7, y: 3 },    { x: 12, y: 3 }, { x: 13, y: 3 },  { x: 15, y: 3 },  { x: 17, y: 3 }, { x: 18, y: 3 }, { x: 19, y: 3 },

      { x: 4, y: 4 },  { x: 9, y: 4 },
    { x: 10, y: 4 },  { x: 13, y: 4 },  { x: 15, y: 4 },   { x: 18, y: 4 }, { x: 19, y: 4 },

     { x: 1, y: 5 }, { x: 2, y: 5 },  { x: 4, y: 5 },  
    { x: 10, y: 5 },  { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 15, y: 5 }, { x: 16, y: 5 },  { x: 18, y: 5 }, 

     { x: 1, y: 6 },   { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, 
    { x: 10, y: 6 },  { x: 12, y: 6 }, { x: 15, y: 6 }, { x: 16, y: 6 },  { x: 19, y: 6 },

     { x: 1, y: 7 }, { x: 2, y: 7 }, 
    { x: 10, y: 7 }, { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 15, y: 7 }, { x: 16, y: 7 },  { x: 18, y: 7 }, 

     { x: 1, y: 8 }, { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 },
    { x: 10, y: 8 }, { x: 12, y: 8 },   { x: 15, y: 8 },  { x: 18, y: 8 }, 

       { x: 12, y: 9 },  { x: 15, y: 9 }, { x: 16, y: 9 },, { x: 2, y: 10 }, { x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 10 }, { x: 6, y: 10 }, { x: 7, y: 10 }, { x: 8, y: 10 }, { x: 9, y: 10 },
    { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 10 },  { x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }, { x: 18, y: 10 }, { x: 19, y: 10 },

    { x: 0, y: 11 }, { x: 1, y: 11 }, { x: 2, y: 11 },   { x: 5, y: 11 }, 
        { x: 18, y: 11 }, { x: 19, y: 11 },

      { x: 5, y: 12 },  { x: 7, y: 12 }, { x: 8, y: 12 }, { x: 9, y: 12 },
    { x: 10, y: 12 }, { x: 11, y: 12 },  { x: 13, y: 12 }, { x: 14, y: 12 }, { x: 16, y: 12 }, { x: 17, y: 12 }, { x: 18, y: 12 }, { x: 19, y: 12 },

    { x: 1, y: 13 }, { x: 2, y: 13 }, { x: 3, y: 13 },  { x: 5, y: 13 },  { x: 7, y: 13 }, { x: 8, y: 13 }, 
    { x: 10, y: 13 }, { x: 11, y: 13 }, { x: 12, y: 13 }, { x: 13, y: 13 }, { x: 14, y: 13 }, { x: 16, y: 13 },

     { x: 1, y: 14 }, { x: 2, y: 14 }, { x: 3, y: 14 },    { x: 19, y: 14 },

     { x: 1, y: 15 },   { x: 5, y: 15 }, { x: 6, y: 15 }, { x: 7, y: 15 }, { x: 8, y: 15 }, { x: 9, y: 15 },
    { x: 10, y: 15 },  { x: 12, y: 15 }, { x: 13, y: 15 }, { x: 14, y: 15 }, { x: 15, y: 15 },  { x: 17, y: 15 }, { x: 18, y: 15 }, { x: 19, y: 15 },

    { x: 1, y: 16 },  { x: 3, y: 16 }, { x: 4, y: 16 },  { x: 6, y: 16 }, { x: 7, y: 16 },  { x: 9, y: 16 },
    { x: 10, y: 16 }, { x: 11, y: 16 }, { x: 14, y: 16 },   { x: 17, y: 16 }, { x: 18, y: 16 }, 

     { x: 1, y: 17 },    { x: 16, y: 17 }, { x: 17, y: 17 }, { x: 18, y: 17 },

     { x: 1, y: 18 }, { x: 2, y: 18 }, { x: 3, y: 18 }, { x: 4, y: 18 }, { x: 5, y: 18 }, { x: 6, y: 18 }, { x: 7, y: 18 }, { x: 8, y: 18 }, { x: 9, y: 18 },
    { x: 10, y: 18 }, { x: 11, y: 18 }, { x: 12, y: 18 }, { x: 13, y: 18 }, { x: 14, y: 18 }, { x: 15, y: 18 },  { x: 17, y: 18 }, { x: 18, y: 18 }, 
];


// Function to update the player's position
function movePlayer(x, y) {
    // Check if the new position is a wall
    if (isWall(x, y)) {
        return;
    }

    // Update the player's position
    playerPosition.x = x;
    playerPosition.y = y;

    // Update the player's grid position in CSS
    player.style.gridColumn = playerPosition.x + 1;
    player.style.gridRow = playerPosition.y + 1;

    // Check if the player has reached the exit
    if (x === exitPosition.x && y === exitPosition.y) {
        alert("Congratulations! You won the game!");
    }
}

// Function to check if a position is a wall
function isWall(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

// Function to handle key presses for player movement
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (playerPosition.y > 0) {
                movePlayer(playerPosition.x, playerPosition.y - 1);
            }
            break;
        case "ArrowDown":
            if (playerPosition.y < gridSize - 1) {
                movePlayer(playerPosition.x, playerPosition.y + 1);
            }
            break;
        case "ArrowLeft":
            if (playerPosition.x > 0) {
                movePlayer(playerPosition.x - 1, playerPosition.y);
            }
            break;
        case "ArrowRight":
            if (playerPosition.x < gridSize - 1) {
                movePlayer(playerPosition.x + 1, playerPosition.y);
            }
            break;
    }
});

// Function to render the walls on the maze
function renderWalls() {
    walls.forEach(wall => {
        const wallElement = document.createElement("div");
        wallElement.classList.add("wall");
        wallElement.style.gridColumn = wall.x + 1;
        wallElement.style.gridRow = wall.y + 1;
        maze.appendChild(wallElement);
    });
}

// Initializing the game
renderWalls();
movePlayer(0, 0); // Set the player at the starting position
