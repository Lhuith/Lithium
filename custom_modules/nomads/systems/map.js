import * as THREE from '/build/three.module.js'
import * as keyboard from '/core/input/keyboard.js'

let dx = -150/2
let dy = -150/2
let map_context, map_context_element;
let atlas;

export const init = (three) => {
    console.log("%cMap Initialized", "color:#FFD9E5")

    map_context_element = document.getElementById('map');
    map_context = map_context_element.getContext('2d')

    map_context_element.style.backgroundColor = 'black'
    map_context_element.imageRendering = "pixilated";
    console.log(map_context_element)
    map_context_element.width  = 150;
    map_context_element.height = 150;

    atlas = new Image();
    atlas.src = '/data/img/tile/Crab_Island/Crab_Island_color.png';

    atlas.onload = function() {
        drawImageToMap(dx, dy)
    }
}

export const update = (delta) => {
    if (keyboard.input.z) {
        dx++
    }
    if (keyboard.input.x) {
        dx--
    }
    drawImageToMap(dx,dy)
}

const drawImageToMap = (dx, dy) => {
    map_context.drawImage(atlas, dx, dy);
}