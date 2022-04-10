import * as THREE from '/build/three.module.js'
import * as keyboard from '/core/input/keyboard.js'

let dx = 0;
let dy = 0;
let map_context;
let atlas;

export const init = (three) => {
    console.log("%cMap Initialized", "color:#FFD9E5")

    let map_context_element = document.getElementById('map');
    map_context = map_context_element.getContext('2d')

    map_context_element.style.backgroundColor = 'black'
    map_context_element.width  = 200;
    map_context_element.height = 200;

    atlas = new Image();
    atlas.src = '/data/img/tile/Crab_Island/Crab_Island_color.png';

    atlas.onload = function() {
        map_context.drawImage(atlas,0, 0);
    }
}

export const update = (delta) => {
    if (keyboard.input.z) {
        dx++
    }
    if (keyboard.input.x) {
        dx--
    }


    let map_context_element = document.getElementById('map');
    map_context = map_context_element.getContext('2d')
    map_context.drawImage(atlas, dx, dy);
}