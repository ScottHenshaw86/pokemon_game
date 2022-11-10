/*
    LEGEND:
        gs - grass_short
        gl - grass_long
        ws - water_shallow
        wd - water_deep
        p - path
        b - building
        f - floor
        d - dirt
        t - trees
        wb - wall_building
        wr - wall_rock
        wt - wall_trees
*/

function getMapImage(tile) {
    let image = "";
    switch (tile) {
        case "wd": 
            image = "water_deep.jpg";
            break;
        case "ws":
            image = "water_shallow.jpg";
            break;
        case "gl":
            image = "grass_long.jpeg";
            break;
        case "t":
            image = "trees.jpg";
            break;
        case "gs":
            image = "grass_short.jpg";
            break;
        case "p":
            image = "ground_path.jpg";
            break;
    }
    return `./assets/images/map_elements/${image}`;
}

const map1 = [
    ["wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "p", "p", "gl", "gl", "gl", "gl"],
    ["wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "p", "p", "gl", "gl", "gl", "gl"],
    ["wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "p", "p", "gl", "gl", "gl", "gl"],
    ["wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "wd", "p", "p", "gl", "gl", "gl", "gl"],
    ["p", "p", "p", "p", "p", "p", "p", "p", "gs", "gs", "p", "p", "gl", "gl", "gl", "gl"],
    ["p", "p", "p", "p", "p", "p", "p", "p", "gs", "gs", "p", "p", "gl", "gl", "gl", "gl"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "p", "p", "p", "p", "p", "p", "p", "p", "p", "gl"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "p", "p", "p", "p", "p", "p", "p", "p", "p", "gl"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "gl", "gl", "gl", "gs", "p", "p", "gs", "p", "p", "p"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "gl", "gl", "gl", "gs", "p", "p", "gs", "p", "p", "p"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "gl", "gl", "gl", "gs", "p", "p", "gs", "gs", "gl", "gl"],
    ["gs", "gs", "gl", "gl", "gl", "gl", "gl", "gl", "gl", "gs", "p", "p", "gs", "gs", "gl", "gl"],
];

function displayMap(map) {
    let table = document.createElement('table');
    for (let row of map) {
        let tr = document.createElement('tr');
        for (let tile of row) {
            let td = document.createElement('td');
            let image = document.createElement('img');
            image.src = getMapImage(tile);
            td.appendChild(image);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.querySelector('#map-screen').appendChild(table);
}

let currentMap = map1;

displayMap(currentMap);
