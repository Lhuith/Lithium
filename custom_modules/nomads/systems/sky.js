import { Color, Vector3 } from '/build/three.module.js';
import * as time from "./time.js";
import {get_game} from "../nomads.js";

let sky_colors = [
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

addEventListener(time.day_event.NewDay.type, function (e) {
    //console.log("New Day Event In Sky!")
}, false)

export const init = () => {
    console.log("%cSky Initialized", "color:#65cdc4")
}

export const update = () => {
    let timeOfDayInSkyLength = time.get_time_of_day_normalized()*sky_colors.length

    let currentIndex = Math.floor(timeOfDayInSkyLength)
    let nextIndex = (currentIndex + 1)%sky_colors.length

    // create a new color that is A now -> B coming lerp/blended, i.e morning orange blends to afternoon blue
    get_game().get_renderer().setClearColor(
        new Color().lerpColors(
            sky_colors[currentIndex],
            sky_colors[nextIndex],
            // timeOfDayInSkyLength - currentIndex  (transition to next value)
            timeOfDayInSkyLength - currentIndex).getHex()
    )
}