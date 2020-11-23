import * as datatype from '/core/data/data_types.js';

export const payload = [
    new datatype.shader_resource(
        "instance_shader", 
        "s",
        '/data/shaders/instance/instance.vs.glsl',
        '/data/shaders/instance/instance.fs.glsl',
        {wf:false, trans:false, anim:false} 
    ),
    new datatype.shader_resource(
            "tree_shader", 
            "s", 
            '/data/shaders/tree/tree.vs.glsl',
            '/data/shaders/tree/tree.fs.glsl',
            {wf:false, trans:true, anim:false} 
     ),
    new datatype.shader_resource(
        "land_shader", 
        "s", 
        '/data/shaders/land/land.vs.glsl',
        '/data/shaders/land/land.fs.glsl',
        {wf:false, trans:true, anim:false}  
    ),
    new datatype.shader_resource(
        "water_Shader", 
        "s", 
        '/data/shaders/water/water.vs.glsl',
        '/data/shaders/water/water.fs.glsl',
        {wf:false, trans:true, anim:true}  
    ),
    new datatype.tile_resource(
        "crab_isle",
        't', 
        '/data/img/tile/Crab_Island/Crab_Island_color.png', 
        '/data/img/tile/Crab_Island/Crab_Island_height.png', 
        '/data/img/tile/Crab_Island/Crab_Island_detail.png',
    ),
    new datatype.tile_resource(
        "water_tile",
        't',
        '/data/img/tile/water_tile.png', 
        '/data/img/tile/water_level_color.png', 
        '/data/img/tile/water_level_color.png',
    ),
    new datatype.tile_resource(
        "sea_floor",
        't', 
        '/data/img/tile/sea_floor_color.png', 
        '/data/img/tile/sea_floor.png', 
        '/data/img/tile/sea_floor_detail.png',
    ),
    new datatype.map_resource("critters", 'm', '/data/img/tile/sea_floor_color.png'),
    new datatype.map_resource("trees", 'm','/data/img/sprite_sheets/trees.png'),
    new datatype.map_resource("sky", 'm','/data/img/sprite_sheets/sky.png'),
    new datatype.map_resource("structures", 'm','/data/img/sprite_sheets/structures.png'),
    new datatype.map_resource("lithies", 'm','/data/img/sprite_sheets/lithies.png'),
    new datatype.map_resource("debug", 'm','/data/img/sprite_sheets/debug.png'),
]; 