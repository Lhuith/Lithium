import * as utils from "/core/meta/helpers/utils.js";

let dx = 0, dy = 0, start_dx = 0, start_dy = 0
let map_context, map_context_element;
let mapData;

//https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry
//https://jsfiddle.net/ufjm50p9/2/
export const init = (map) => {
    console.log("%cMap Initialized", "color:#FFD9E5")
    mapData = new ImageData(map.image.data, map.image.width, map.image.height)

    map_context_element = document.getElementById('map');
    map_context = map_context_element.getContext('2d', {antialias: false});

    map_context_element.width = map.image.width/3 * window.devicePixelRatio;
    map_context_element.height = map.image.height/3 * window.devicePixelRatio;

    start_dx = -(map.image.width/3)*2
    start_dy = -(map.image.height/3)*2

    map_context_element.style.width = `${(map.image.width/3)/1.25}px`;
    map_context_element.style.height = `${(map.image.height/3)/1.25}px`;
    map_context_element.style.backgroundColor = 'black'
    map_context_element.style.left = '0%'
    map_context_element.mozImageSmoothingEnabled = false;
    map_context_element.webkitImageSmoothingEnabled = false;
    map_context_element.msImageSmoothingEnabled = false;
    map_context_element.imageSmoothingEnabled = false;

    map_context.putImageData(mapData,
        start_dx + dx, start_dy + dy, 0, 0,
        (map.image.width/3)*5 * window.devicePixelRatio,
        (map.image.height/3)*5 * window.devicePixelRatio)
}

export const update = (delta) => {
   // drawImageToMap(dx,dy)
}

export const setMapCoords = (x, y) =>{
    dx = x
    dy = y
}

const drawImageToMap = (x, y) => {
    if (map_context != null || map_context !== undefined){
        map_context.putImageData(
            imageData,
            start_dx + dx, start_dy + dy, 0, 0,
            (map.image.width /3)*5 * window.devicePixelRatio,
            (map.image.height/3)*5 * window.devicePixelRatio)
    }
}