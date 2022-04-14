import * as THREE from '/build/three.module.js'
import * as keyboard from '/core/input/keyboard.js'

let dx = 0, dy = 0, start_dx = 0, start_dy = 0
let map_context, map_context_element;
let atlas;

//https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry
//https://jsfiddle.net/ufjm50p9/2/
export const init = (three) => {
    console.log("%cMap Initialized", "color:#FFD9E5")

    atlas = new Image();
    atlas.src = '/data/img/tile/world/world.png';
    atlas.style.imageRendering = "pixilated"


    atlas.onload = function() {
        map_context_element = document.getElementById('map');
        map_context = map_context_element.getContext('2d')

        map_context_element.width = atlas.width/3 * window.devicePixelRatio;
        map_context_element.height = atlas.height/3 * window.devicePixelRatio;

        start_dx = -(atlas.width/3)*2
        start_dy = -(atlas.height/3)*2

        map_context_element.style.width = `${(atlas.width/3)/1.25}px`;
        map_context_element.style.height = `${(atlas.height/3)/1.25}px`;
        map_context_element.style.backgroundColor = 'black'
        map_context_element.style.left = '0%'

        let ctx = map_context_element.getContext('2d', {antialias: false});
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        drawImageToMap(start_dx,start_dy)
    }
}

export const update = (delta) => {
    drawImageToMap(dx,dy)
}

export const setMapCoords = (x, y) =>{
    dx = x
    dy = y
}

const drawImageToMap = (x, y) => {
    if (map_context != null || map_context !== undefined){
        map_context.drawImage(atlas, start_dx + x, start_dy + y, (atlas.width/3)*5 * window.devicePixelRatio, (atlas.height/3)*5 * window.devicePixelRatio)
    }
}