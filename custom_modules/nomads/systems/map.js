import * as THREE from '/build/three.module.js'
import * as keyboard from '/core/input/keyboard.js'

let dx = -150/2
let dy = -150/2
let map_context, map_context_element;
let atlas;

//https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry
//https://jsfiddle.net/ufjm50p9/2/
export const init = (three) => {
    console.log("%cMap Initialized", "color:#FFD9E5")

    atlas = new Image();
    atlas.src = '/data/img/tile/Crab_Island/Crab_Island_color.png';
    atlas.style.imageRendering = "pixilated"


    atlas.onload = function() {
        map_context_element = document.getElementById('map');
        map_context = map_context_element.getContext('2d')

        map_context_element.width = atlas.width * window.devicePixelRatio;
        map_context_element.height = atlas.height * window.devicePixelRatio;

        map_context_element.style.width = `${atlas.width/1.25}px`;
        map_context_element.style.height = `${atlas.height/1.25}px`;
        map_context_element.style.backgroundColor = 'black'
        map_context_element.style.left = '86%'

        let ctx = map_context_element.getContext('2d', {antialias: false});
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
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
    map_context.drawImage(atlas, dx, dy, atlas.width*5 * window.devicePixelRatio,
        atlas.height*5 * window.devicePixelRatio)
}