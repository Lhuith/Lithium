import {BufferAttribute, BufferGeometry, Points, PointsMaterial, Vector3} from "three"
import {get_game} from "../../../../nomads/nomads.js";
import {collider_helper} from "./collider_helper.js";

export class plane_collider_helper extends collider_helper{
    type = this.constructor.name
    constructor(){
        super()
        this.mat = null
    }
    set_mat(mat){
        if (mat != undefined) {
            this.mat = mat
        } else {
            console.error("mat not defined!")
        }
    }
    computeVertices() {
        let v1 = new Vector3(0,0,0),
            v2 = new Vector3(0,0,0),
            v3 = new Vector3(0,0,0),
            v4 = new Vector3(0,0,0)
        if (this.mat != null) {
            v1 = new Vector3(this.left, this.top,0).applyMatrix4(this.mat)
            v2 = new Vector3(this.right,this.top,0).applyMatrix4(this.mat)
            v3 = new Vector3(this.right,this.bottom,0).applyMatrix4(this.mat)
            v4 = new Vector3(this.left, this.bottom, 0).applyMatrix4(this.mat)
        }
        return {v1, v2, v3, v4}
    }
    display(b) {
        this.dot.visible = b
    }
    update(){
        if(this.dot.visible){
            let vertices = this.computeVertices()
            this.geoAttribute.setXYZ(0, vertices.v1.x, vertices.v1.y, 0)
            this.geoAttribute.setXYZ(1, vertices.v2.x, vertices.v2.y, 0)
            this.geoAttribute.setXYZ(2, vertices.v3.x, vertices.v3.y, 0)
            this.geoAttribute.setXYZ(3, vertices.v4.x, vertices.v4.y, 0)
            this.geoAttribute.needsUpdate = true
        }
    }
}