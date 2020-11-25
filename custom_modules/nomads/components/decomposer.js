import { Vector3, Vector4 } from '/build/three.module.js';
import {SPRITE, SOLID, PARTICLE} from '/nomads/globals.js';

export const pass_transforms = (o) => {
    this.orient = o;
}
export const sprite = (meta, pass_transform) => {
    return new decomposer(meta, SPRITE, pass_transform)
}
export const solid = (meta, pass_transform) => {
    return new decomposer(meta, SOLID, pass_transform)
}
export const particle(meta, pass_transform) => {
    return new decomposer(meta, PARTICLE, pass_transform)
}

export class decomposer {
    constructor(meta, type, pass_transform){
        if(meta == undefined){ 
            meta = get_meta().default
        }
        if(meta.map_key == undefined){ 
            throw new Error("Map Key not defined!");
        }
        if(renderers.get(meta.map_key) == undefined){ 
            throw new Error("Renderer is required for decomposer!");
        }
    
        this.skip_occlusion = false;
    
        if(meta.skip_occlusion != null){ 
            this.skip_occlusion = meta.skip_occlusion;
        } 
    
        this.tile_size = new Vector3(1,1);
    
        if(meta.tile_size != null){
            this.tile_size = new Vector2(meta.tile_size.x, meta.tile_size.y);
        }
    
        var renderer = renderers.get(meta.map_key);
    
        this.ssIndex = array_map_to_ss(meta.mapping);
        this.animationFrames = meta.frames;
        this.colors = array_hex_to_three_color(meta.colors);
        this.type = type || 0;
        this.attributes_reference = renderer.attributes;
    
        this.orient;
        this.scale = new Vector3(1,1,1);
        
        if(pass_transform == null){
            this.orient = new Vector4(
                meta.transform.orient.x, meta.transform.orient.y, 
                meta.transform.orient.z, meta.transform.orient.w);
        } else {
            this.orient = pass_transform.orient.clone();
        }
        
        this.parent = null; //for gameobject
    
        this.buffer_idx = renderer.buffer.index;
        this.buffer = renderer.buffer;
        this.animate = renderer.animate;
    
        this.rendering = false;
    }
}