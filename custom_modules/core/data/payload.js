import * as datatype from '/core/data/data_types.js';

export const payload = [
    new datatype.raw_resource(
        "instance_shader", 
        "s", 
        new datatype.shader_resource(
            '/data/shaders/instance/instance.vs.glsl',
            '/data/shaders/instance/instance.fs.glsl',
            {wf:false, trans:false, anim:false} 
        )),
    new datatype.raw_resource(
        "tree_shader", 
        "s", 
        new datatype.shader_resource(
            '/data/shaders/tree/tree.vs.glsl',
            '/data/shaders/tree/tree.fs.glsl',
            {wf:false, trans:true, anim:false} 
        )),
    new datatype.raw_resource(
        "land_shader", 
        "s", 
        new datatype.shader_resource(
            '/data/shaders/land/land.vs.glsl',
            '/data/shaders/land/land.fs.glsl',
            {wf:false, trans:true, anim:false}  
        )),
    new datatype.raw_resource(
        "water_Shader", 
        "s", 
        new datatype.shader_resource(
            '/data/shaders/water/water.vs.glsl',
            '/data/shaders/water/water.fs.glsl',
            {wf:false, trans:true, anim:true}  
        )),
    new datatype.raw_resource(
        "crab_isle",
        't', 
        new datatype.tile_resource(
            '/data/img/tile/Crab_Island/Crab_Island_color.png', 
            '/data/img/tile/Crab_Island/Crab_Island_height.png', 
            '/data/img/tile/Crab_Island/Crab_Island_detail.png',
        )),
    new datatype.raw_resource(
        "water_tile",
        't', 
        new datatype.tile_resource(
            '/data/img/tile/water_tile.png', 
            '/data/img/tile/water_level_color.png', 
            '/data/img/tile/water_level_color.png',
        )),
    new datatype.raw_resource(
        "sea_floor",
        't', 
        new datatype.tile_resource(
            '/data/img/tile/sea_floor_color.png', 
            '/data/img/tile/sea_floor.png', 
            '/data/img/tile/sea_floor_detail.png',
        )),
    new datatype.raw_resource(
        "critters", 'm', new datatype.map_resource('/data/img/tile/sea_floor_color.png')),
    new datatype.raw_resource(
        "trees", 'm', new datatype.map_resource('/data/img/sprite_sheets/trees.png')),
    new datatype.raw_resource(
        "sky", 'm', new datatype.map_resource('/data/img/sprite_sheets/sky.png')),
    new datatype.raw_resource(
        "structures", 'm', new datatype.map_resource('/data/img/sprite_sheets/structures.png')),
    new datatype.raw_resource(
        "lithies", 'm', new datatype.map_resource('/data/img/sprite_sheets/lithies.png')),
    new datatype.raw_resource(
        "debug", 'm', new datatype.map_resource('/data/img/sprite_sheets/debug.png')),
]; 