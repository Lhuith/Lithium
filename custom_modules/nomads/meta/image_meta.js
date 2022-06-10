import * as datatype from '/core/data/datatypes.js';

export const image_meta = [
    new datatype.shader_resource(
        "instance_shader", 
        "s",
        '/core/shaders/instance/instance.vs.glsl',
        '/core/shaders/instance/instance.fs.glsl',
        {wf:false, trans:false, anim:false} 
    ),
    new datatype.shader_resource(
        "tree_shader", 
        "s", 
        '/core/shaders/tree/tree.vs.glsl',
        '/core/shaders/tree/tree.fs.glsl',
        {wf:false, trans:true, anim:false} 
     ),
    new datatype.shader_resource(
        "land_shader", 
        "s", 
        '/core/shaders/land/land.vs.glsl',
        '/core/shaders/land/land.fs.glsl',
        {wf:true, trans:true, anim:false}  
    ),
    new datatype.shader_resource(
        "water_shader", 
        "s", 
        '/core/shaders/water/water.vs.glsl',
        '/core/shaders/water/water.fs.glsl',
        {wf:false, trans:true, anim:true}  
    ),
    
    new datatype.tile_resource(
        "crab_isle",
        't', 
        '/public/data/img/tile/Crab_Island/Crab_Island_color.png',
        '/public/data/img/tile/Crab_Island/Crab_Island_height.png',
        '/public/data/img/tile/Crab_Island/Crab_Island_detail.png',
    ),
    new datatype.tile_resource(
        "water",
        't',
        '/public/data/img/tile/water/water_color.png',
        '/public/data/img/tile/water/water_height.png',
        '/public/data/img/tile/water/water_detail.png',
    ),
    new datatype.tile_resource(
        "sea_floor",
        't', 
        '/public/data/img/tile/sea_floor_color.png', 
        '/public/data/img/tile/sea_floor.png', 
        '/public/data/img/tile/sea_floor_detail.png',
    ),
    new datatype.tile_resource(
        "world",
        't',
        '/public/data/img/tile/world/world.png',
        '/public/data/img/tile/world/world_height.png',
        '/public/data/img/tile/world/world.png',
    ),


    new datatype.map_resource("critters", 'm', '/public/data/img/sprite_sheets/critters.png'),
    new datatype.map_resource("trees", 'm','/public/data/img/sprite_sheets/trees.png'),
    new datatype.map_resource("sky", 'm','/public/data/img/sprite_sheets/sky.png'),
    new datatype.map_resource("structures", 'm','/public/data/img/sprite_sheets/structures.png'),
    new datatype.map_resource("lithies", 'm','/public/data/img/sprite_sheets/lithies.png'),
    new datatype.map_resource("debug", 'm','/public/data/img/sprite_sheets/debug.png'),
]; 