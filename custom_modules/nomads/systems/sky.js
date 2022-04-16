import { Color, Vector3 } from '/build/three.module.js';
import * as time from "./time.js";

var sky_colors = [
    new Color( 0xEDA479), //Prime Morning
    new Color( 0x749AC5), //Prime Day
    new Color( 0x749AC5), //Prime Day
    new Color( 0x749AC5), //Prime Day
    new Color( 0x749AC5), //Prime Day
    new Color( 0xEDA479), //Prime Morning
    new Color( 0xEDA479), //Prime Morning
    new Color( 0xAC98D3), //TRANS Night
    new Color( 0x292965), //Prime Night
    new Color( 0x170C2E), //Night Tip
    new Color( 0x170C2E), //Prime Night
    new Color( 0xAC98D3), //TRANS Night
];

let renderer

export const init = (r) => {
    console.log("%cSky Initialized", "color:#65cdc4")
    renderer = r
}

export const update = () => {
    console.log((Math.floor(time.get_second()/sky_colors.length)%sky_colors.length))
    renderer.setClearColor(sky_colors[Math.floor(time.get_second()/sky_colors.length)%sky_colors.length].getHex())
}