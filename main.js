let elements = {
    fire: {
        strong: "grass",
        weak: "water"
    },
    water: {
        strong: "fire",
        weak: "grass"
    },
    grass: {
        strong: "water",
        weak: "fire"
    },
    normal: {
        strong: null,
        weak: null
    }
}

// MAIN GAME LOOP
function game() {
    let playerPokemon;
    while (!playerPokemon) {
        let selection = prompt(`Choose your pokemon: 
        fire, water, or grass`);
        switch(selection) {
            case "fire":
                playerPokemon = new Firemon();
                break;
            case "water":
                playerPokemon = new Watermon();
                break;
            case "grass":
                playerPokemon = new Grassmon();
                break;
        }
    }
    while (isPlaying) {
        battle();
        isPlaying = prompt("Battle again?");
    }
}