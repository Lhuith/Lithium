import {BufferAttribute, BufferGeometry, Points, PointsMaterial, Vector3} from "three";
import {get_game} from "../../nomads/nomads.js";

export class rectangle {
    type = this.constructor.name
    
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    left(){
        return this.x - this.w / 2;
    }
    right(){
        return this.x + this.w / 2;
    }
    top(){
        return this.y - this.h / 2;
    }
    bottom(){
        return this.y + this.h / 2;
    }
    contains(o){
        if(o == undefined) {
            return false
        }

        return (
            o.pos.x >= this.x - this.w &&
            o.pos.x <= this.x + this.w &&
            o.pos.z >= this.y - this.h &&
            o.pos.z <= this.y + this.h);
    }
    intersects(range){
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h);
    }
    display(){
    //   const dotGeometry = new BufferGeometry();

    //   let array = [
    //       this.left(), this.top(),    0,
    //       this.right(), this.top(),   0,
    //       this.right(), this.bottom(), 0,
    //       this.left(), this.bottom(),     0,
    //   ]
    //   dotGeometry.setAttribute(
    //       'position', new BufferAttribute(new Float32Array(array), 3));

    //   const dotMaterial = new PointsMaterial({ size: .1, color: 0xff0000 });
    //   let dot = new Points(dotGeometry, dotMaterial)
    //   get_game().get_three().scene.add(dot);
    }
    hide(){
    }
} 