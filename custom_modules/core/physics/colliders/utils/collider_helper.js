import {BufferAttribute, BufferGeometry, Points, PointsMaterial, Vector3} from "three"
import {get_game} from "../../../../nomads/nomads.js";

export class collider_helper {
    type = this.constructor.name
    constructor(){
        const dotGeometry = new BufferGeometry()
        this.geoAttribute = this.computeBufferArray()
        dotGeometry.setAttribute('position', this.geoAttribute)
        const dotMaterial = new PointsMaterial({ size: .1, color: 0xff0000 })
        this.dot = new Points(dotGeometry, dotMaterial)
        get_game().get_three().scene.add(this.dot)
    }
    computeBufferArray(){
        let vertices = this.computeVertices()
        let array = []
        for (let i in vertices) {
            array.push(vertices[i].x, vertices[i].y, vertices[i].z)
        }
        return new BufferAttribute(new Float32Array(array), 3)
    }
    computeVertices() {
        console.warn("using default vertex array, override to specific collider geometry")
        let v1 = new Vector3(0,0,0),
            v2 = new Vector3(0,0,0),
            v3 = new Vector3(0,0,0),
            v4 = new Vector3(0,0,0)
        return {v1, v2, v3, v4}
    }
    display(b) {
        this.dot.visible = b
    }
    update(){
    }
}