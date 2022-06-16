import { component } from '/core/engine/component.js';
import { get_data} from '/core/data/antlion.js'

import * as THREE from '/build/three.module.js'
import { color_and_mesh_from_height } from '/core/geometry/color_and_mesh_from_height.js'

export class zone extends component {
    type = "zone"
    required = [];
    constructor(key, lod, physical, three){
        super()

        let map = get_data(key)
        this.shader = get_data("land_shader")

        map.color.wrapS = THREE.RepeatWrapping
        map.color.wrapT = THREE.RepeatWrapping

        this.tile = this.generate_tile({
            height: map.height,
            detail: map.detail, 
        }, lod, physical, three.scene)
    }
    init(){
    }
    generate_tile(maps, lod){
        //let material = this.create_material()
        let newTile = color_and_mesh_from_height(maps.height, maps.detail, lod)

        this.color = new THREE.DataTexture(
            newTile.colormap, maps.height.width, maps.height.height, THREE.RGBAFormat)
        this.color.needsUpdate = true

        this.color.wraps = THREE.RepeatWrapping
        this.color.wrapT = THREE.RepeatWrapping
        //this.color.repeat.x = - 1;
        this.color.flipX = true;

        return new THREE.Mesh( newTile.geo, new THREE.MeshLambertMaterial({
            map: this.color
        }))
    }
    update(){
        //console.warn("default component update.")
    }
    set_parent(p){
        this.parent = p;
    }
    set_requirement(r){
        //console.warn("default component requirment set.")
    }
}