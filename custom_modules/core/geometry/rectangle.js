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
        this.mat = null
        const dotGeometry = new BufferGeometry()


        this.geoAttribute =  new BufferAttribute(new Float32Array(this.generateVerticesArray()), 3)
        dotGeometry.setAttribute('position', this.geoAttribute)
        const dotMaterial = new PointsMaterial({ size: 100, color: 0xff0000 })
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

        var windowWidth = window.innerWidth;
        var minWidth = 1280;

        if(windowWidth < minWidth) {
            windowWidth = minWidth;
        }

        var widthHalf = (windowWidth/2);
        var heightHalf = (window.innerHeight/2);

        let v1 = new Vector3(0,0,0),
            v2 = new Vector3(0,0,0),
            v3 = new Vector3(0,0,0),
            v4 = new Vector3(0,0,0)

        if (this.mat != null) {
            //vector.project(camera);
            get_game().three.camera.updateWorldMatrix()
            v1 = new Vector3(1, 0,-1).add(get_game().three.camera.position).project(get_game().three.camera)
            v1.x = ( v1.x * widthHalf ) + widthHalf;
            v1.y = - ( v1.y * heightHalf ) + heightHalf;
            v1.z = 0
            v1.unproject(get_game().three.camera)
            console.log(v1.x, get_game().three.camera.position.x)
            v2 = new Vector3(this.right(), this.top(),0)
            v3 = new Vector3(this.right(), this.bottom(),0)
            v4 = new Vector3(this.left(), this.bottom(),0)
        }

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