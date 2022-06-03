import {instance_geometry_attributes} from '/core/data/instance_geometry/instance_geometry_attributes.js'
import { get_data } from '/core/data/antlion.js'

import {renderering_meta} from '/core/data/renderering_meta.js'
import {meta} from '/core/data/meta.js'

import * as THREE from 'three'
import {Vector4} from '/build/three.module.js'
import * as file from '/meta/helpers/ajax.js'

const predefine_buffer = (size = 0) => {
    let translation = []
    let orientations = []
    let vector =  new Vector4()
    let scales = []
    let colors = []
    let uvoffsets = []
    let tile_size = []
    let animation_start = []
    let animation_end = []
    let animation_time = []
    let render_type = []
    let fog = []
    let m0 = []
    let m1 = []
    let m2 = []
    let m3 = []

    for(let i = 0; i < size; i++){
        translation.push(0,0,0)
        orientations.push(0,0,0,1)
        scales.push(0,0,0)
        colors.push(0,0,0,1)
        uvoffsets.push(0,0)
        tile_size.push(0,0)
        animation_start.push(0)
        animation_end.push(0)
        animation_time.push(0)
        render_type.push(0)
        fog.push(0)
        m0.push(0,0,0,1)
        m1.push(0,0,0,1)
        m2.push(0,0,0,1)
        m3.push(0,0,0,1)
    }
    return {
        translation,
        orientations,
        vector,
        scales,
        colors,
        uvoffsets,
        tile_size,
        animation_start,
        animation_end,
        animation_time,
        render_type,
        fog,
        m0,
        m1,
        m2,
        m3,
    }
}

export class instance_geometry_renderer {
    type = "instance_geometry_renderer"

    constructor(map_index, mesh, animate, is3D = false, shader){
        this.buffer_size = 50
        this.attributes = new instance_geometry_attributes()
        this.mesh = mesh
        this.map_index = map_index
        this.shader = null
    
        if(shader == undefined){
            //console.warn("shader not found, using defualt!")
            this.shader = get_data("instance_shader")
        } else {
            this.shader = shader
        }
    
        this.animate = animate
        this.is3D = is3D
    }

    save_attributes = () => {
        file.update({
            id: renderering_meta[this.map_index].name+"_sprite_renderer",
            attributes: [
                this.attributes.states,
            ]
        }, " ");
    }
    load_attributes = (callback) => {
        let name = renderering_meta[this.map_index].name+"_sprite_renderer"
        file.get({id: name}, callback, name);
    }
    bake_attributes = () => {
        let buffer = predefine_buffer(this.buffer_size)
    
        let bufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1) 
        bufferGeometry.castShadow = true
    
        let geometry = new THREE.InstancedBufferGeometry()
        geometry.index = bufferGeometry.index
        geometry.attributes.position = bufferGeometry.attributes.position
        geometry.attributes.uv = bufferGeometry.attributes.uv
      
        //let translationAttribute = new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.translation), 3)
        let orientationAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.orientations), 4)
        let colorAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.colors), 4)
        let uvOffsetAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.uvoffsets), 2)
        let tileSizeAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.tile_size), 2)
        let scaleAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.scales), 3)
        let animation_startAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.animation_start), 1)
        let animation_endAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.animation_end), 1)
        let animation_timeAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.animation_time), 1)
        let renderTypeAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.render_type), 1)
        let fogAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.fog), 1)
        let m0Attribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.m0), 4)
        let m1Attribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.m1), 4)
        let m2Attribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.m2), 4)
        let m3Attribute = new THREE.InstancedBufferAttribute(
            new Float32Array(buffer.m3), 4)
    
        //geometry.setAttribute('translation', translationAttribute)
        geometry.setAttribute('orientation', orientationAttribute)
        geometry.setAttribute('col', colorAttribute)
        geometry.setAttribute('uvoffset', uvOffsetAttribute)
        geometry.setAttribute('tile_size', tileSizeAttribute)
        geometry.setAttribute('scale', scaleAttribute)
        geometry.setAttribute('animation_start', animation_startAttribute)
        geometry.setAttribute('animation_end', animation_endAttribute)
        geometry.setAttribute('animation_time', animation_timeAttribute)
        geometry.setAttribute('type', renderTypeAttribute)
        geometry.setAttribute('fog', fogAttribute)
        geometry.setAttribute('m0', m0Attribute)
        geometry.setAttribute('m1', m1Attribute)
        geometry.setAttribute('m2', m2Attribute)
        geometry.setAttribute('m3', m3Attribute)
        
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
            ], this.buffer_size
        )
      
        let texture = new THREE.TextureLoader().load(
            '../data/'+renderering_meta[this.map_index].map)
    
        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
    
        let animationSwitch = 0
        let is3DSwitch = 0
    
        if (this.animate)
            animationSwitch = 1.0
    
        if(this.is3D)
            is3DSwitch = 1.0
    
        let instanceUniforms = {
            map: { value: texture },
            spriteSheetX: { type: "f", value: meta.SPRITE_SHEET_SIZE.x },
            spriteSheetY: { type: "f", value: meta.SPRITE_SHEET_SIZE.y },
            animationSwitch: { type: "f", value: animationSwitch },
            is3D: { type: "f", value: is3DSwitch },
            time: { type: "f", value: 1.0 },
        }
    
        if(this.shader == undefined){
            console.error("shader wasn't found, using default.")
            this.shader = get_data("instance_shader")
        }
    
        let material = new THREE.RawShaderMaterial({
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
        })
    
        let mesh = new THREE.Mesh(geometry, material)
        material.uniforms.map.value = texture
        material.uniforms.spriteSheetX.value = meta.SPRITE_SHEET_SIZE.x
        material.uniforms.spriteSheetY.value = meta.SPRITE_SHEET_SIZE.y
    
        material.side = THREE.DoubleSide
        mesh.frustumCulled = false
        mesh.castShadow = true

        console.log("objects baked: ", this.buffer_size)
        this.mesh.add(mesh)
    }
}