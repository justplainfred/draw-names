const PUCK_RADIUS_BUFFER = 50
const PEG_RADIUS = 10;

const boardWidth = document.getElementById('game-canvas').width;
const boardHeight = document.getElementById('game-canvas').height;

const numPegs = 20;

function isValidPosition(x, y, pegs) {
    if (x < PUCK_RADIUS_BUFFER && x > PEG_RADIUS) return false;
    if (x > boardWidth - PUCK_RADIUS_BUFFER && x < boardWidth - PEG_RADIUS) return false;
    if (y < PUCK_RADIUS_BUFFER * 1.25) return false;
    if (y > boardHeight - PUCK_RADIUS_BUFFER * 2 ) return false;
    for (const peg of pegs) {
        const [px, py, pr] = peg;
        const distance = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
        if (distance < (PEG_RADIUS + PEG_RADIUS + PUCK_RADIUS_BUFFER)) {
            return false;
        }
    }
    return true;
}

// Function to generate pegs
function generatePegs() {
    const pegs = [];
    const maxAttempts = 5000;  // To prevent infinite loop
    let attempts = 0;

    while (pegs.length < numPegs && attempts < maxAttempts) {
        attempts++;
        const x = Math.random() * (boardWidth - 2 * PEG_RADIUS) + PEG_RADIUS;
        const y = Math.random() * (boardHeight - 2 * PEG_RADIUS) + PEG_RADIUS;

        if (isValidPosition(x, y, pegs)) {
            pegs.push([x, y, PEG_RADIUS]);
        }
    }

    return pegs;
}

var Pegs = generatePegs();