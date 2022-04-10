import * as THREE from '/build/three.module.js'

let map_index = 0
let map_max_index = 200
let map_context;
let atlas;

export const init = (three) => {
    console.log("%cMap Initialized", "color:#FFD9E5")

    map_context = document.getElementById('map').getContext('2d');
    map_context.width = 500
    map_context.height = 500

    atlas = new Image();
    atlas.src = '/data/img/tile/Crab_Island/Crab_Island_color.png';

    atlas.onload = function() {
        map_context.drawImage(atlas, atlas.width/2, atlas.height*2);
    }
}

export const update = (delta) => {
    map_context.drawImage(
        atlas,
        (map_index++)%map_max_index,
        delta);
}