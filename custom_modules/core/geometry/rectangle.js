import {BufferAttribute, BufferGeometry, Points, PointsMaterial, Vector3} from "three"
import {get_game} from "../../nomads/nomads.js"
import {get} from "../meta/helpers/ajax.js";

export class rectangle {
    type = this.constructor.name
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        const dotGeometry = new BufferGeometry()


        this.geoAttribute =  new BufferAttribute(new Float32Array(this.generateVerticesArray()), 3)
        dotGeometry.setAttribute('position', this.geoAttribute)
        const dotMaterial = new PointsMaterial({ size: .1, color: 0xff0000 })
        this.dot = new Points(dotGeometry, dotMaterial)

        get_game().get_three().scene.add(this.dot)
        this.show_collider = false
        this.dot.visible = this.show_collider
    }
    left(){
        return this.x - this.w / 2
    }
    right(){
        return this.x + this.w / 2
    }
    top(){
        return this.y - this.h / 2
    }
    bottom(){
        return this.y + this.h / 2
    }
    computeVertices() {

        let width = window.innerWidth, height = window.innerHeight;
        let widthHalf = width / 2, heightHalf = height / 2;

        /*
            v1.x = ( v1.x * widthHalf ) + widthHalf;
            v1.y = - ( v1.y * heightHalf ) + heightHalf;
            v1.z = 0
         */

        let v1 = new Vector3(this.left(), this.top(),0).project(get_game().get_three().camera)
        let v2 = new Vector3(this.right(), this.top(),0).project(get_game().get_three().camera)
        let v3 = new Vector3(this.right(), this.bottom(),0).project(get_game().get_three().camera)
        let v4 = new Vector3(this.left(), this.bottom(),0).project(get_game().get_three().camera)
        return {v1, v2, v3, v4}
    }
    generateVerticesArray(){
        let vertices = this.computeVertices()
        console.log(vertices)
        return [
            vertices.v1.x, vertices.v1.y, 0,
            vertices.v2.x, vertices.v2.y, 0,
            vertices.v3.x, vertices.v3.y, 0,
            vertices.v4.x, vertices.v4.y, 0
        ]
    }
    contains(o){
        if(o == undefined) {
            return false
        }
        return (
            o.pos.x >= this.x - this.w &&
            o.pos.x <= this.x + this.w &&
            o.pos.z >= this.y - this.h &&
            o.pos.z <= this.y + this.h)
    }
    display(b) {
        this.dot.visible = b
    }
    intersects(range){
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h)
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
    hide(){
    }
} 