import { component } from '/nomads/components/component.js';
import { Vector3, Vector4, Vector2 } from '/build/three.module.js';
import { SPRITE, SOLID, PARTICLE } from '/nomads/globals.js';
import { get_meta, get_renderers } from '/core/data/antlion.js';
import { misc, col } from '/meta/helpers/utils.js';
import { quaternion } from '/core/math/quaternion.js';

export const pass_transforms = (o) => {
    this.orient = o;
}
export const sprite = (meta, pass_transform) => {
    return new decomposer(meta, SPRITE, pass_transform)
}
export const solid = (meta, pass_transform) => {
    return new decomposer(meta, SOLID, pass_transform)
}
export const particle = (meta, pass_transform) => {
    return new decomposer(meta, PARTICLE, pass_transform)
} 

export class decomposer extends component {
    type = "decomposer"
    required = ["transform"]

    constructor(meta, type, pass_transform) {
        super();
        if(meta == undefined){ 
            meta = get_meta().default
        }
        if(meta.map_key == undefined){ 
            throw new Error("map Key not defined!");
        }
        if(get_renderers().get(meta.map_key) == undefined){ 
            throw new Error("renderer is required for decomposer!");
        }
        this.skip_occlusion = false;
    
        if(meta.skip_occlusion != null){ 
            this.skip_occlusion = meta.skip_occlusion;
        } 
    
        this.tile_size = new Vector3(1,1);
    
        if(meta.tile_size != null){
            this.tile_size = new Vector2(meta.tile_size.x, meta.tile_size.y);
        }
    
        var renderer = get_renderers().get(meta.map_key);
    
        this.ssIndex = misc.arrayMapToSS(meta.mapping);
        this.animationFrames = meta.frames;
        this.colors = col.arrayHexToThreeColor(meta.colors);
        this.render_type = type || 0;
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
    update = () => {
        //if(this.animate)
            //this.attribute_debug();
            if(this.transform != null){  
                this.matrix = this.transform.get_transformation().to_three();
                // have to tell the buffer/instance_geometry to update aswell
                this.attributes_reference.set_transform(this.buffer_idx, this.matrix)
                this.attributes_reference.set_orientation(this.buffer_idx, new quaternion(0,0,0,1).to_three());
            }
    }
    update_buffer_animation = (animation) => {
        //this.buffer.set_animation(this.buffer_idx, animation);
    }
    set_animation = (s, e, t) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_animation(this.buffer_idx, s, e, t);
        }
    }
    attribute_debug = () => {
        if(this.attributes_reference != null && this.attributes_reference.length != 0){
            var color_attribute = this.attributes_reference.col;
            color_attribute.setXYZ(this.buffer_idx, 0,random_range(0, 1),0);
            color_attribute.needsUpdate = true;
        } else {
            console.error("no attributes found!");
        }
    }
    set_color = (hex) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_color(this.buffer_idx, hex)
        }
    }
    set_alpha = (alpha) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_alpha(this.buffer_idx, alpha)
        }
    }
    set_type = (type) => {
        if(type < 0 || type > 3){
            console.error("type must be in range 0 - 3");
            return
        }
        if(this.attributes_reference != null){
            this.attributes_reference.set_type(this.buffer_idx, type)
        }
    }
    set_transform = (t) => {
        this.transform = t;
    
        // this is why we need to split up the instance shader :|
        this.scale = this.transform.scale;
        this.matrix = t.get_transformation().to_three();
    
        // append to the buffer after all fields are set
        if(!this.skip_occlusion) {
            //TestQuadTree.insert(new qt_point(
            //    this.parent.transform.get_transformed_position(), 
            //    this.parent.id
            //    ))
        } else {
           
        }
        this.attributes_reference.set(this);
    }
    render = (type) => {
        if(!this.rendering){
            if(type != undefined){
                this.set_type(type);
            }
            this.attributes_reference.set(this)
            this.rendering = true;
        }
    }
    derender = () => {
        if(this.rendering){
            this.attributes_reference.unset(this.buffer_idx)
            this.rendering = false;
        }
    }
    set_usefog = (b) => {s
        this.usefog = b;
    }
    set_requirment(r){
        if(r.type == "transform"){
            this.set_transform(r);
        }
    }
    //TODO TO JSON??
}