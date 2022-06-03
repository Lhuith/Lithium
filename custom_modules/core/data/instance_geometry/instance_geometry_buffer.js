import {Vector4} from '/build/three.module.js';

export class instance_geometry_buffer {
    type = "instance_buffer";
    
    constructor(prefill = 0){
        this.translation = [];
        this.orientations = [];
        this.vector =  new Vector4();
        this.scales = [];
        this.colors = [];
        this.uvoffsets = [];
        this.tile_size = [];
        this.animation_start = [];
        this.animation_end = [];
        this.animation_time = [];
        this.render_type = [];
        this.fog = [];
        this.m0 = [];
        this.m1 = [];
        this.m2 = [];
        this.m3 = [];
        this.index = 0;
    
        if(prefill != 0){
            this.prefill(prefill)
        }
    }
    prefill = (size) => {
        for(let i = 0; i < size; i++){
            this.translation.push(0,0,0);
            this.orientations.push(0,0,0,1);
            this.vector =  new Vector4();
            this.scales.push(0,0,0);
            this.colors.push(0,0,0,1);
            this.uvoffsets.push(0,0);
            this.tile_size.push(0,0);
            this.animation_start.push(0);
            this.animation_end.push(0);
            this.animation_time.push(0);
            this.render_type.push(0);
            this.fog.push(0);
            this.m0.push(0,0,0,1);
            this.m1.push(0,0,0,1);
            this.m2.push(0,0,0,1);
            this.m3.push(0,0,0,1);
            this.index ++;
        }
    }
    get_index = () => {
        return this.index;
    }
    set_animation = (index, animation) => {
        this.animation_start[index] = animation.start;
        this.animation_end[index] = animation.length;
        this.animation_time[index] = random_range(0, 3);
    }
    set = (decomposer, animation) => {
        console.log("setting to buffer??")
        this.tile_size[this.index] = decomposer.tile_size.x; 
        this.tile_size[this.index + 1] = decomposer.tile_size.y;
    
        this.scales[this.index] = decomposer.scale.x;
        this.scales[this.index + 1] = decomposer.scale.y;
        this.scales[this.index + 2] = decomposer.scale.z;
    
        // ¯\_(ツ)_/¯
        this.vector.set(
            decomposer.position.x, 
            decomposer.position.y, 
            decomposer.position.z, 0).normalize();
    
        this.translation[this.index] = decomposer.position.x + this.vector.x;
        this.translation[this.index + 1] = decomposer.position.y + this.vector.y;
        this.translation[this.index + 2] = decomposer.position.z + this.vector.z;
    
        //  ¯\_(ツ)_/¯
        this.vector.set(
            decomposer.position.x, 
            decomposer.position.y,
            decomposer.position.z
        ).normalize();
    
        this.orientations[this.index] = decomposer.orient.x;
        this.orientations[this.index + 1] = decomposer.orient.y;
        this.orientations[this.index + 2] = decomposer.orient.z;
        this.orientations[this.index + 3] = decomposer.orient.w;
    
        let col = decomposer.colors[randomRangeRound(0, decomposer.colors.length - 1)];
        this.colors[this.index] = col.r;
        this.colors[this.index + 1] = col.g;
        this.colors[this.index + 2] = col.b;
        this.colors[this.index + 3] = col.a;
     
        let uvs = decomposer.ssIndex[randomRangeRound(0, decomposer.ssIndex.length - 1)];
        this.uvoffsets[this.index] = uvs.x;
        this.uvoffsets[this.index + 1] = uvs.x;
    
        if(animation != null){
            this.animation_start[this.index] = animation.start;
            this.animation_end[this.index] = animation.length;
            this.animation_time[this.index] = random_range(0, 3);
        } else {
            this.animation_start[this.index] = 0;
            this.animation_end[this.index] = 0;
            this.animation_time[this.index] = 0;
        }
    
        this.render_type[this.index] = decomposer.render_type;
        this.fog[this.index] = decomposer.fog;
    
        //Most Transform information now within the matrix 
        this.m0[this.index + 0] = decomposer.matrix.elements[0];
        this.m0[this.index + 1] = decomposer.matrix.elements[1];
        this.m0[this.index + 2] = decomposer.matrix.elements[2];
        this.m0[this.index + 3] = decomposer.matrix.elements[3];
    
        this.m1[this.index + 0] = decomposer.matrix.elements[4];
        this.m1[this.index + 1] = decomposer.matrix.elements[5];
        this.m1[this.index + 2] = decomposer.matrix.elements[6];
        this.m1[this.index + 3] = decomposer.matrix.elements[7];
    
        this.m2[this.index + 0] = decomposer.matrix.elements[8];
        this.m2[this.index + 1] = decomposer.matrix.elements[9];
        this.m2[this.index + 2] = decomposer.matrix.elements[10];
        this.m2[this.index + 3] = decomposer.matrix.elements[11];
    
        this.m3[this.index + 0] = decomposer.matrix.elements[12];
        this.m3[this.index + 1] = decomposer.matrix.elements[13];
        this.m3[this.index + 2] = decomposer.matrix.elements[14];
        this.m3[this.index + 3] = decomposer.matrix.elements[15];
    
        this.index ++;
    }
    append = (decomposer, animation) => {
        this.tile_size.push(
            decomposer.tile_size.x, 
            decomposer.tile_size.y,
        );
    
        this.scales.push(
            decomposer.scale.x, 
            decomposer.scale.y, 
            decomposer.scale.z
        );
    
        this.vector.set(
            decomposer.position.x, 
            decomposer.position.y, 
            decomposer.position.z, 0).normalize();
    
        this.translation.push(
            decomposer.position.x + this.vector.x, 
            decomposer.position.y + this.vector.y, 
            decomposer.position.z + this.vector.z
        );
    
        this.vector.set(
            decomposer.position.x, 
            decomposer.position.y,
            decomposer.position.z
        ).normalize();
    
        this.orientations.push(
            decomposer.orient.x, 
            decomposer.orient.y, 
            decomposer.orient.z, 
            decomposer.orient.w);
    
        let col = decomposer.colors[randomRangeRound(0, decomposer.colors.length - 1)];
        this.colors.push(col.r, col.g, col.b, col.a);
      
        let uvs = decomposer.ssIndex[randomRangeRound(0, decomposer.ssIndex.length - 1)];
    
        this.uvoffsets.push(uvs.x, uvs.y);
    
        if(animation != null){
            this.animation_start.push(animation.start);
            this.animation_end.push(animation.length);
            this.animation_time.push(random_range(0, 3));
        } else {
            this.animation_start.push(0);
            this.animation_end.push(0);
            this.animation_time.push(0);
        }
    
        this.render_type.push(decomposer.render_type);
    
        this.fog.push(decomposer.fog);
    
        //Most Transform information now within the matrix 
        this.m0.push(
            decomposer.matrix.elements[0],  decomposer.matrix.elements[1],  decomposer.matrix.elements[2],  decomposer.matrix.elements[3],
        );
        this.m1.push(
            decomposer.matrix.elements[4],  decomposer.matrix.elements[5],  decomposer.matrix.elements[6],  decomposer.matrix.elements[7],
        );
        this.m2.push(
            decomposer.matrix.elements[8],  decomposer.matrix.elements[9],  decomposer.matrix.elements[10], decomposer.matrix.elements[11],
        );
        this.m3.push(
            decomposer.matrix.elements[12], decomposer.matrix.elements[13], decomposer.matrix.elements[14], decomposer.matrix.elements[15],
        );
    
        this.index ++;
    }
}