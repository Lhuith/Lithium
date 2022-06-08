import { Object3D } from '/build/three.module.js'; 

export const render_meta = [
    {
        name: "critters_render_meta",
        map:'img/sprite_sheets/critters.png',
        animate:true,
        is3D:false,
    },
    {
        name: "trees_render_meta",
        map:'img/sprite_sheets/trees.png', 
        animate:false, 
        is3D:false, 
    },
    {
        name: "sky_render_meta",
        map:'img/sprite_sheets/sky.png', 
        animate:false, 
        is3D:false, 
    },
    {
        name: "structures_render_meta",
        map:'img/sprite_sheets/structures.png', 
        animate:false, 
        is3D:false,
    },
    {
        name: "lithies_render_meta",
        map:'img/sprite_sheets/lithies.png', 
        animate:true, 
        is3D:true, 
    },
    {
        name: "debug_render_meta",
        map:'img/sprite_sheets/debug.png', 
        animate:false, 
        is3D:false, 
    },
    {
        name: "multi_test_render_meta",
        map:'img/sprite_sheets/multi_test.png', 
        animate:true, 
        is3D:true,
    },
];