const MAP_WIDTH = 90;

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i=0; i<collisions.length; i+= MAP_WIDTH) {
    collisionsMap.push(collisions.slice(i, MAP_WIDTH + i));
}

const battleZonesMap = [];
for (let i=0; i<battleZones.length; i+= MAP_WIDTH) {
    battleZonesMap.push(battleZones.slice(i, MAP_WIDTH + i));
}

const boundaries = [];
const offset = {
    x: -2704,
    y: -1765
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    }
                })
            )
        }
    })
});

console.log(boundaries);

// Create the map
const image = new Image();
image.src = './assets/images/map_elements/PelletTown.png';

const foregroundImage = new Image();
foregroundImage.src = './assets/images/map_elements/foregroundObjects.png';

const playerDownImage = new Image();
playerDownImage.src = "./assets/images/character/PlayerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./assets/images/character/PlayerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./assets/images/character/PlayerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./assets/images/character/PlayerRight.png";

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2, // 192 is the height of the image
        y: canvas.height / 2 - 68 / 2 // 68 is the width of the image
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

// canvas.width / 2 - this.image.width / 4 / 2, 
// canvas.height / 2 - this.image.height / 2,

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const movables = [background, ...boundaries, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    );
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    player.draw();
    foreground.draw();
    let moving = true;
    player.moving = false;
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true;
        player.image = player.sprites.up;
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) { 
                console.log('colliding');
                moving = false;
                break;
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y += 3});
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true;
        player.image = player.sprites.down;
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) { 
                console.log('colliding');
                moving = false;
                break;
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.y -= 3});
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true;
        player.image = player.sprites.left;
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) { 
                console.log('colliding');
                moving = false;
                break;
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x += 3});
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true;
        player.image = player.sprites.right;
        for (let i=0; i<boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x -3,
                        y: boundary.position.y
                    }}
                })
            ) { 
                console.log('colliding');
                moving = false;
                break;
            }
        }

        if (moving)
        movables.forEach(movable => {movable.position.x -= 3});
    } 
}

animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
        keys.w.pressed = true;
        lastKey = 'w';
    }
    if (e.key == "a" || e.key == "ArrowLeft") {
        keys.a.pressed = true;
        lastKey = 'a';
    }
    if (e.key == "d" || e.key == "ArrowRight") {
        keys.d.pressed = true;
        lastKey = 'd';
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        keys.s.pressed = true;
        lastKey = 's';
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
        keys.w.pressed = false;
    }
    if (e.key == "a" || e.key == "ArrowLeft") {
        keys.a.pressed = false;
    }
    if (e.key == "d" || e.key == "ArrowRight") {
        keys.d.pressed = false;
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        keys.s.pressed = false;
    }
});

