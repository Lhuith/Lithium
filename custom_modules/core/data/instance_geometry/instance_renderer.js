import {instance_buffer} from '/core/data/instance_geometry/instance_buffer.js'
import {instance_attributes} from '/core/data/instance_geometry/instance_attributes.js'
import { get_data } from '/core/data/antlion.js'

import {renderering_meta} from '/core/data/renderering_meta.js'
import {meta} from '/core/data/meta.js'

import * as THREE from 'three'

export class instance_renderer {
    type = "instance_renderer"

    constructor(map_index, mesh, animate, is3D = false, shader){
        this.buffer = new instance_buffer(true);
        this.attributes = new instance_attributes();
        this.mesh = mesh;
        this.map_index = map_index;
        
        this.shader = null;
    
        if(shader == undefined){
            //console.warn("shader not found, using defualt!")
            this.shader = get_data("instance_shader");
        } else {
            this.shader = shader;
        }
    
        this.animate = animate;
        this.is3D = is3D
    }
    get_buffer = () => {
        return this.buffer;
    }
    get_attributes = () => {
        return this.attributes;
    }
    buffer_append = (o) => {
        if(o != undefined){
            if(o.get_component("decomposer") != null){
                this.buffer.append(o.get_component("decomposer"))
            }
        }
    }
    bake_buffer = () => {
        if (this.buffer == undefined || this.buffer.length == 0) {
            console.error("buffer error.")
        }
    
        if(this.buffer.index <= 0){
            console.log("buffer is empty!")
            return
        }
    
        var bufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1); 
        bufferGeometry.castShadow = true;
    
        var geometry = new THREE.InstancedBufferGeometry();
        geometry.index = bufferGeometry.index;
        geometry.attributes.position = bufferGeometry.attributes.position;
        geometry.attributes.uv = bufferGeometry.attributes.uv;
      
        //var translationAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.translation), 3);
        var orientationAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.orientations), 4);
        var colorAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.colors), 4);
        var uvOffsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.uvoffsets), 2);
        var tileSizeAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.tile_size), 2);
        var scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.scales), 3);
        var animation_startAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.animation_start), 1);
        var animation_endAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.animation_end), 1);
        var animation_timeAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.animation_time), 1);
        var renderTypeAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.render_type), 1);
        var fogAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.fog), 1);
        var m0Attribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.m0), 4);
        var m1Attribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.m1), 4);
        var m2Attribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.m2), 4);
        var m3Attribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.m3), 4);
    
        //geometry.setAttribute('translation', translationAttribute);
        geometry.setAttribute('orientation', orientationAttribute);
        geometry.setAttribute('col', colorAttribute);
        geometry.setAttribute('uvoffset', uvOffsetAttribute);
        geometry.setAttribute('tile_size', tileSizeAttribute);
        geometry.setAttribute('scale', scaleAttribute);
        geometry.setAttribute('animation_start', animation_startAttribute);
        geometry.setAttribute('animation_end', animation_endAttribute);
        geometry.setAttribute('animation_time', animation_timeAttribute);
        geometry.setAttribute('type', renderTypeAttribute);
        geometry.setAttribute('fog', fogAttribute);
        geometry.setAttribute('m0', m0Attribute);
        geometry.setAttribute('m1', m1Attribute);
        geometry.setAttribute('m2', m2Attribute);
        geometry.setAttribute('m3', m3Attribute);
        
        this.attributes.populate(
            [
                //translationAttribute,
                orientationAttribute,
                colorAttribute,
                uvOffsetAttribute,
                tileSizeAttribute,
                scaleAttribute,
                animation_startAttribute,
                animation_endAttribute,
                animation_timeAttribute,
                renderTypeAttribute,
                fogAttribute,
                m0Attribute,
                m1Attribute,
                m2Attribute,
                m3Attribute,
            ], this.buffer.index
        );
      
        var texture = new THREE.TextureLoader().
        load('../data/'+renderering_meta[this.map_index].map);
    
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
    
        var animationSwitch = 0;
        var is3DSwitch = 0;
    
        if (this.animate)
            animationSwitch = 1.0;
    
        if(this.is3D)
            is3DSwitch = 1.0;
    
        var instanceUniforms = {
            map: { value: texture },
            spriteSheetX: { type: "f", value: meta.SPRITE_SHEET_SIZE.x },
            spriteSheetY: { type: "f", value: meta.SPRITE_SHEET_SIZE.y },
            animationSwitch: { type: "f", value: animationSwitch },
            is3D: { type: "f", value: is3DSwitch },
            time: { type: "f", value: 1.0 },
        }
    
        if(this.shader == undefined){
            console.error("shader wasnt found, using defualt.");
            this.shader = get_data("instance_shader");
        }
    
        var material = new THREE.RawShaderMaterial({
            uniforms:
                THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    THREE.UniformsLib['fog'],
                    instanceUniforms
                ]),
    
            vertexShader: this.shader.vert,
            fragmentShader:  this.shader.frag,
            wireframe:  this.shader.extra.wf,
            transparent:  this.shader.extra.trans,
            fog: true,
            lights: true,
        });
    
        var mesh = new THREE.Mesh(geometry, material);
        material.uniforms.map.value = texture;
        material.uniforms.spriteSheetX.value = meta.SPRITE_SHEET_SIZE.x;
        material.uniforms.spriteSheetY.value = meta.SPRITE_SHEET_SIZE.y;
    
        material.side = THREE.DoubleSide;
        mesh.frustumCulled = false;
        mesh.castShadow = true;
        //console.log("objects baked: ", this.buffer.index)
    
        this.mesh.add(mesh);
    }
}