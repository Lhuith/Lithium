import { Color, Vector3 } from '/build/three.module.js';
import * as time from "./time.js";
import {get_game} from "../nomads.js";
import {gameobject} from "../../core/engine/gameobject.js";
import {quaternion} from "../../core/math/quaternion.js";
import {particle } from "../components/decomposer.js";
import {get_sprite_meta} from "../../core/data/antlion.js";
import {to} from "../../core/meta/helpers/utils.js";
import {Object3D} from "three";

let sky, sun, moon, sunThreeObj

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

    sky = new gameobject("sky", new Vector3(0,0,0),
        new Vector3(1,1,1), new quaternion(0,0,0,1).eulerToQuaternion(new Vector3(0, 0, 0)))
    moon = new gameobject("moon",
        new Vector3(0,0,1000), new Vector3(100,100,100), new quaternion(0,0,0,1))
    moon.add_component(particle(get_sprite_meta().moon))
    sun = new gameobject("sun",
        new Vector3(0,0,-1000), new Vector3(300,300,300), new quaternion(0,0,0,1))
    sun.add_component(particle(get_sprite_meta().sun))
    // TODO setup sky map
    //let stars = new gameobject("stars",
    //    new Vector3(0,0,0), new Vector3(1,1,1), new quaternion(0,0,0,1))
    //sky.add_child(stars)

    sky.add_child(moon)
    sky.add_child(sun)

    sunThreeObj = new Object3D()
    sunThreeObj.position.set(
        moon.transform.get_transformed_position().x,
        moon.transform.get_transformed_position().y,
        moon.transform.get_transformed_position().z)

    get_game().get_three().scene.add(sunThreeObj)
    get_game().get_three().light.target = sunThreeObj
}

export const update = (delta) => {
    let timeOfDayInSkyLength = time.get_time_of_day_normalized()*sky_colors.length

    let currentIndex = Math.floor(timeOfDayInSkyLength)
    let nextIndex = (currentIndex + 1)%sky_colors.length

    sky.transform.rotate(new Vector3(1, 0, 0), to.rad(time.get_time_of_day_normalized() * 360))
    sky.update(delta)

    sunThreeObj.position.set(
        moon.transform.get_transformed_position().x, moon.transform.get_transformed_position().y, moon.transform.get_transformed_position().z)
    // create a new color that is A now -> B coming lerp/blended, i.e morning orange blends to afternoon blue
    get_game().get_renderer().setClearColor(
        new Color().lerpColors(
            sky_colors[currentIndex],
            sky_colors[nextIndex],
            // timeOfDayInSkyLength - currentIndex  (transition to next value)
            timeOfDayInSkyLength - currentIndex).getHex()
    )
}