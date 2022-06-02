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

addEventListener(time.day_event.NewDay.type, function (e) {
    //console.log("New Day Event In Sky!")
}, false)

export const init = (r) => {
    console.log("%cSky Initialized", "color:#65cdc4")
    renderer = r
}

export const update = () => {
    var timeOfDayInSkyLength = time.get_time_of_day_normalized()*sky_colors.length

    var currentIndex = Math.floor(timeOfDayInSkyLength)
    var nextIndex = (currentIndex + 1)%sky_colors.length

    // create a new color that is A now -> B coming lerp/blended, i.e morning orange blends to afternoon blue
    renderer.setClearColor(
        new Color().lerpColors(
            sky_colors[currentIndex],
            sky_colors[nextIndex],
            // timeOfDayInSkyLength - currentIndex  (transition to next value)
            timeOfDayInSkyLength - currentIndex).getHex()
    )
}