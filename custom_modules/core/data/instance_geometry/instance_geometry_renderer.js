import {instance_geometry_attributes} from '/core/data/instance_geometry/instance_geometry_attributes.js'
import { get_data } from '/core/data/antlion.js'

import {render_meta} from '/nomads/meta_data/render_meta.js'
import sprite_meta from '/nomads/meta_data/sprite_meta.json' assert{type:"json"}

import * as THREE from 'three'
import {Vector4, Object3D} from '/build/three.module.js'
import * as file from '/core/meta/helpers/ajax.js'

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

    constructor(map_index, animate, is3D = false){
        this.buffer_size = 50
        this.attributes = new instance_geometry_attributes()
        this.mesh = new Object3D()
        this.map_index = map_index
        //TODO fix shaders: get_data(render_meta[i].shader)
        this.shader = get_data("instance_shader")
        this.animate = animate
        this.is3D = is3D
    }

    save_and_populate_attributes = (array, index, loaded) => {
        if (!loaded) {
            file.update({
                id: render_meta[this.map_index].name,
                attributes: array,
                index:  index
            }, " ");
        }
        this.attributes.populate(array, index)
    }

    load_attributes = (callback) => {
        let name = render_meta[this.map_index].name
        file.get({id: name}, callback, name);
    }

    bake_attributes = (data) => {

        let bufferGeometry = new THREE.PlaneBufferGeometry(1, 1, 1) 
        bufferGeometry.castShadow = true
    
        let geometry = new THREE.InstancedBufferGeometry()
        geometry.index = bufferGeometry.index
        geometry.attributes.position = bufferGeometry.attributes.position
        geometry.attributes.uv = bufferGeometry.attributes.uv

        let attributes_array = []
        let isLoaded = false
        if (data != undefined) {
            isLoaded = true
            for(let attribute of data.attributes){
                attributes_array.push(
                    new THREE.InstancedBufferAttribute(new Float32Array(attribute.array), attribute.itemSize)
                )
            }
        } else {
            console.log("\tcreating new attributes")
            let buffer = predefine_buffer(this.buffer_size)
            attributes_array = [
                // translationAttribute,
                // new THREE.InstancedBufferAttribute(new Float32Array(this.buffer.translation), 3)
                // orientationAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.orientations), 4),
                // colorAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.colors), 4),
                // uvOffsetAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.uvoffsets), 2),
                // tileSizeAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.tile_size), 2),
                // scaleAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.scales), 3),
                // animation_startAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.animation_start), 1),
                // animation_endAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.animation_end), 1),
                // animation_timeAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.animation_time), 1),
                // renderTypeAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.render_type), 1),
                // fogAttribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.fog), 1),
                // m0Attribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.m0), 4),
                // m1Attribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.m1), 4),
                // m2Attribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.m2), 4),
                // m3Attribute
                new THREE.InstancedBufferAttribute(new Float32Array(buffer.m3), 4)
            ]
        }
        // save and store new attribute arrays to json and instance data
        this.save_and_populate_attributes (attributes_array, this.buffer_size, isLoaded)

        //geometry.setAttribute('translation', translationAttribute)
        geometry.setAttribute('orientation', this.attributes.orientation)
        geometry.setAttribute('col', this.attributes.col)
        geometry.setAttribute('uvoffset', this.attributes.uvoffset)
        geometry.setAttribute('tile_size', this.attributes.tile_size)
        geometry.setAttribute('scale', this.attributes.scale)
        geometry.setAttribute('animation_start', this.attributes.animation_start)
        geometry.setAttribute('animation_end', this.attributes.animation_end)
        geometry.setAttribute('animation_time', this.attributes.animation_time)
        geometry.setAttribute('type', this.attributes.render_type)
        geometry.setAttribute('fog', this.attributes.fog)
        geometry.setAttribute('m0', this.attributes.m0)
        geometry.setAttribute('m1', this.attributes.m1)
        geometry.setAttribute('m2', this.attributes.m2)
        geometry.setAttribute('m3', this.attributes.m3)

        let texture = new THREE.TextureLoader().load(
            '../data/'+render_meta[this.map_index].map)

        texture.magFilter = THREE.NearestFilter
        texture.minFilter = THREE.NearestFilter
    
        let animationSwitch = 0
        let is3DSwitch = 0
    
        if (this.animate)
            animationSwitch = 1.0
    
        if(this.is3D)
            is3DSwitch = 1.0

        if(this.shader == undefined){
            //console.error("shader wasn't found, using default.")
            this.shader = get_data("instance_shader")
        }
    
        let material = new THREE.RawShaderMaterial({
            uniforms:
                THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    THREE.UniformsLib['fog'],
                    // instance uniforms
                    {
                        map: { value: texture },
                        spriteSheetX: { type: "f", value: sprite_meta.SPRITE_SHEET_SIZE.x },
                        spriteSheetY: { type: "f", value: sprite_meta.SPRITE_SHEET_SIZE.y },
                        animationSwitch: { type: "f", value: animationSwitch },
                        is3D: { type: "f", value: is3DSwitch },
                        time: { type: "f", value: 1.0 },
                    }
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
        material.uniforms.spriteSheetX.value = sprite_meta.SPRITE_SHEET_SIZE.x
        material.uniforms.spriteSheetY.value = sprite_meta.SPRITE_SHEET_SIZE.y
    
        material.side = THREE.DoubleSide
        mesh.frustumCulled = false
        mesh.castShadow = true

        console.log(
            "%c\tbaking renderer["+this.buffer_size.toString()+"] "+render_meta[this.map_index].name, "color:#34d2eb")
        this.mesh.add(mesh)
    }
}