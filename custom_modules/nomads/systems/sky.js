import { Color, Vector3 } from '/build/three.module.js';

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

export const init = (r) => {
    console.log("%cSky Initialized", "color:#65cdc4")
    r.setClearColor(sky_colors[2].getHex())
}

export const update = (delta) => {
}