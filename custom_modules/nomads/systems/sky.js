import { Color, Vector3 } from '/build/three.module.js';
import { gameobject } from '/core/data/gameobject.js';
import { quaternion } from '/core/math/quaternion.js';
import { particle } from '/nomads/components/decomposer.js';
import { get_meta } from '/core/data/antlion.js'
import { math, to } from '/meta/helpers/utils.js'; 

var cycle_length = 24 * 3;
var current_time = 0;
var time = 0;
var sky_index = 0;
var sky_lerp_index = 0;
var sky, moon, sun;

var step = 0;

var min_distance = 300;
var max_distance = 500;
var renderer;

var stars_array = []

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
    renderer = r;
    sky = new gameobject("sky", new Vector3 (0,0,0), 
    new Vector3(1,1,1), new quaternion(0,0,0,1));

    sun = new gameobject("sun", new Vector3 (0,0, 1000), 
    new Vector3(500,500,500), new quaternion(0,0,0,1));

    moon = new gameobject("moon", new Vector3 (0, 0, -1000), 
    new Vector3(200,200,200), new quaternion(0,0,0,1));

    sky.add_child(sun);
    sky.add_child(moon);

    sun.add_component(particle(
        get_meta().sun,
    ));

    moon.add_component(particle( get_meta().moon));

    moon.get_component("decomposer").set_alpha(0.0);

    var stars = new gameobject("stars", new Vector3(0,0,0), new Vector3(1, 1, 1), new quaternion(0,0,0,1));
    //genenerate_stars(stars)
    sky.add_child(stars);
}

export const update = (delta) => {

    ////stars.update(delta);
//
    //time += delta; 
    //current_time = (time % cycle_length);
    //
    //var ingame_time = (current_time/cycle_length) * 24;
//
    //var raw_sky_index = math.normalize(0, cycle_length, current_time) * sky_colors.length;
//
    //sky_index = Math.floor(raw_sky_index);
//
    ////need to figure out length to next color and lerp to it
    ////current to next, length
    //sky_lerp_index = raw_sky_index - sky_index;
//
    //var current_color = new Color(sky_colors[sky_index].getHex()).lerp(
    //    sky_colors[(sky_index + 1) % sky_colors.length], sky_lerp_index);
    
    renderer.setClearColor(sky_colors[1]);
    //current_color.getHex(), 1 
   //step = Math.PI/2 * raw_sky_index;//(Math.PI*2)*(raw_sky_index/sky_colors.length);
   //
   //if(sky != undefined) {
   //    sky.transform.rotation = new quaternion(null,null,null,null, 
   //    new Vector3(1, 0, 0), ((step)));
   //}
   //
   //// TODO: find a better formula for this later on :|
   //var index_normal = ((raw_sky_index/sky_colors.length) + 0.25) % 1;
   //
   //if(index_normal > 0.5){
   //    index_normal = Math.cos(index_normal + 0.5);
   //}

   //sun.update(delta);
   //moon.update(delta);
   //sky.update(delta);
   ////sun.intensity = math.clamp(math.easingFunctions.easeInOutCubic(index_normal) * 4.75, 0.//05, 1);

   //// 0 = sun.intensity - (sun.intensity/1.0)
   //// 1 = sun.intensity - (sun.intensity/1.0)
   //// TODO: Fix formula for better star alpha lerping :c
   ////for(var i = 0; i < stars_array.length; i++){
   ////    stars_array[i].get_component("decomposer").set_alpha(Math.cos(((sun.intensity/-1.0) //- 0.5)));
   ////}
}