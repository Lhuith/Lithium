import { component } from '/core/engine/component.js';
import { Vector3, Vector4, Vector2, Color} from "/build/three.module.js";
import { SPRITE, SOLID, PARTICLE } from '/nomads/globals.js';
import {get_sprite_meta, get_renderer} from '/core/data/antlion.js';
import { map, col } from '/core/meta/helpers/utils.js';
import { quaternion } from '/core/math/quaternion.js';
import { transform } from '/core/math/transform.js';
import {math} from '/core/meta/helpers/utils.js';

export const sprite = (meta, transform_override) => {
    return new decomposer(meta, SPRITE, transform_override)
}
export const solid = (meta, transform_override) => {
    return new decomposer(meta, SOLID, transform_override)
}
export const particle = (meta, transform_override) => {
    return new decomposer(meta, PARTICLE, transform_override)
} 
export class decomposer extends component {
    type = "decomposer"
    required = ["transform"]

    constructor(meta, type, transform_override) {
        super();

        if(meta == undefined) {
            meta = get_sprite_meta().default
        } else if(meta.map_key == undefined) {
            throw new Error("map key not defined!");
        }

        let renderer = get_renderer(meta.map_key)
        if(renderer == undefined){
            throw new Error("renderer is required for decomposer!");
        }
        this.attributes_reference = renderer.attributes;
        // where in the renderer's mem this decomposer points too

        this.attribute_memory_index = 0;
        this.animate = renderer.animate;

        this.tile_size = new Vector3(1,1);
        if(meta.tile_size != null){
            this.tile_size = new Vector2(meta.tile_size.x, meta.tile_size.y);
        }
    
        this.ss_index = map.arrayMapToSS(meta.mapping);
        this.animation_frames = meta.frames;
        this.colors = col.arrayHexToThreeColor(meta.colors);
        this.render_type = type || 0;
        this.orient = new Vector4(0,0,0,1);
        this.scale = new Vector3(1,1,1);
        
        // transform override refers to the inner transform of the sprite, not the game object itself
        if (transform_override != null) {
            this.local_transform = transform_override;
        } else if (meta.transform != null) {
            this.local_transform = new transform (
                new Vector3(meta.transform.position.x, meta.transform.position.y, meta.transform.position.z),
                new Vector3(meta.transform.scale.x, meta.transform.scale.y, meta.transform.scale.z),
                new quaternion(meta.transform.orient.x, meta.transform.orient.y, 
                    meta.transform.orient.z, meta.transform.orient.w, null, null, null)
            );
        } else {
            this.local_transform = new transform (
                new Vector3(0,0,0), 
                new Vector3(1,1,1), 
                new quaternion(0, 0, 0, 1, null, null, null)
            );
        }
    }

    update = (delta) => {
       // this.attribute_debug();
        if(this.transform != null) {
            this.set_matrix()
            if (this.transform.hasChanged()) {
                // have to tell the buffer/instance_geometry to update as-well
                this.attributes_reference.set_transform(this.attribute_memory_index, this.matrix)
                this.attributes_reference.set_orientation(this.attribute_memory_index, new quaternion(0,0,0,1).to_three());
            }
        }
    }

    update_buffer_animation = (animation) => {
        //this.buffer.set_animation(this.attribute_memory_index, animation);
    }

    set_animation_attribute = (s, e, t) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_animation(this.attribute_memory_index, s, e, t);
        }
    }
    attribute_debug = () => {
        if(this.attributes_reference != null && this.attributes_reference.length != 0){
            let color_attribute = this.attributes_reference.col;
            color_attribute.setXYZ(this.attribute_memory_index, 0, math.random_range(0, 1),0);
            color_attribute.needsUpdate = true;
        } else {
            console.error("no attributes found!");
        }
    }

    set_color_attribute = (hex) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_color(this.attribute_memory_index, new Color(hex))
        }
    }

    set_alpha_attribute = (alpha) => {
        if(this.attributes_reference != null){
            this.attributes_reference.set_alpha(this.attribute_memory_index, alpha)
        }
    }

    set_type_attribute = (type) => {
        if(type < 0 || type > 3){
            console.error("type must be in range 0 - 3");
            return
        }
        if(this.attributes_reference != null){
            this.attributes_reference.set_type(this.attribute_memory_index, type)
        }
    }

    set_transform = (t) => {
        this.transform = t;
        this.local_transform.parent = t;
        this.scale = this.transform.scale;
        this.set_matrix()
        this.attributes_reference.set_attributes(this);

    }

    set_matrix() {
        if(this.render_type == 0) {
            this.matrix = this.local_transform.get_transformation_noRot().to_three();
        } else {
            this.matrix = this.local_transform.get_transformation().to_three();
        }
    }

    render = (type) => {
        if(type != undefined){
            this.set_type(type);
        }
        this.attributes_reference.set_attributes(this)
    }

    derender = () => {
        this.attributes_reference.unset_attributes(this.attribute_memory_index)
    }

    set_usefog = (b) => {s
        this.usefog = b;
    }
    //set_requirement(r){
    //    if(r.type == "transform"){
    //        this.set_transform_attribute(r);
    //    }
    //}
    //TODO TO JSON??
}