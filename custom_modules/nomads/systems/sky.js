import { Color, Vector3 } from '/build/three.module.js';
import * as time from "./time.js";

var sky_colors = [
    new Color(0xEDA479), //Prime Morning
    new Color(0x749AC5), //Prime Day
    new Color(0x749AC5), //Prime Day
    new Color(0x749AC5), //Prime Day
    new Color(0x749AC5), //Prime Day
    new Color(0xEDA479), //Prime Morning
    new Color(0xEDA479), //Prime Morning
    new Color(0xAC98D3), //TRANS Night
    new Color(0x292965), //Prime Night
    new Color(0x170C2E), //Night Tip
    new Color(0x170C2E), //Prime Night
    new Color(0xAC98D3), //TRANS Night
];

let renderer

export const init = (r) => {
    console.log("%cSky Initialized", "color:#65cdc4")
    console.log(sky_colors.length)
    renderer = r
}

export const update = () => {
    var timeOfDayInSkyLength = time.get_time_of_day_normalized()*sky_colors.length

    var currentIndex = Math.floor(timeOfDayInSkyLength)
    var transitionToNext = timeOfDayInSkyLength - currentIndex
    var nextIndex = (currentIndex + 1)%sky_colors.length

    var transitionSkyColor = new Color().lerpColors(sky_colors[currentIndex], sky_colors[nextIndex], transitionToNext)


    renderer.setClearColor(transitionSkyColor.getHex())
}